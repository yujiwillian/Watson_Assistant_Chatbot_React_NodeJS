#!/bin/sh
export APP_BLUEGREEN_SUFFIX='-green';
export APP_DOMAIN="mybluemix.net";
export MANIFEST_APP="./manifest.yml";

setAppName() {
  echo "Naming app..."
  if [ "$TRAVIS_BRANCH" = "master" ]; then
      export CF_APP="chatbot-api"
  else
      export CF_APP="chatbot-api-dev"
  fi
  echo "Done."
}

setEnvVars() {
  echo "Setting app environment variables"
  export LOGDNA_KEY="$LOGDNA_KEY"
  export LOGDNA_URL="$LOGDNA_URL"
  export WATSON_API_KEY="$WATSON_API_KEY"
  export WATSON_API_URL="$WATSON_API_URL"
  export ASSISTANT_ID="$ASSISTANT_ID"
  export ASSISTANT_API="$ASSISTANT_API"

  if [ "$TRAVIS_BRANCH" = "master" ]; then
      export NODE_ENV="production"
  else
      export NODE_ENV="development"
  fi
  echo "Done."
}

setCloudFoundry() {
  echo "Installing IBM Cloud CLI..."
  sh ./etc/ibmcloud.sh
  echo "Done."

  echo "Installing CF plugin to IBM Cloud CLI"
  ibmcloud cf install

  echo "Authenticating to IBM Cloud..."
  ibmcloud config --check-version false
  ibmcloud login --apikey $IBM_CLOUD_KEY -r us-south
  ibmcloud target -g "${IBM_CLOUD_RESOURCE_GROUP}"
  ibmcloud target -o "${IBM_CLOUD_ORG}" -s "${IBM_CLOUD_SPACE}"
}

renameApplication () {
  ibmcloud cf rename "${CF_APP}${APP_BLUEGREEN_SUFFIX}" "${CF_APP}";
  exit 0;
}

yarn install -g @nestjs/cli
yarn build

#name app properly according to environment
setAppName;
#setting variables variable
setEnvVars;
#Download ibmcloud cli, auth and set targets
setCloudFoundry;

# PUSH APP
ibmcloud cf push "${CF_APP}${APP_BLUEGREEN_SUFFIX}" -n "${CF_APP}" -f "${MANIFEST_APP}" --no-start;
# Setting Env 
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" NODE_ENV ${NODE_ENV}
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" LOGDNA_KEY $LOGDNA_KEY
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" LOGDNA_URL $LOGDNA_URL
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" WATSON_API_KEY ${WATSON_API_KEY}
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" WATSON_API_URL ${WATSON_API_URL}
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" ASSISTANT_ID ${ASSISTANT_ID}
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" ASSISTANT_API ${ASSISTANT_API}
ibmcloud cf restage "${CF_APP}${APP_BLUEGREEN_SUFFIX}"
# Start app
ibmcloud cf start "${CF_APP}${APP_BLUEGREEN_SUFFIX}"
# BLUEGREEN DEPLOY OF APP

# BLUEGREEN DEPLOY OF APP
if ibmcloud cf delete "${CF_APP}" -f; then
    renameApplication
else
    renameApplication
fi