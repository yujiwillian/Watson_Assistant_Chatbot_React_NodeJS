#!/bin/sh
export APP_BLUEGREEN_SUFFIX='-green';
export APP_DOMAIN="mybluemix.net";
export MANIFEST_APP="./manifest.yml";

setAppName() {
    echo "Naming app..."
    if [ "$TRAVIS_BRANCH" = "master" ]; then
        export CF_APP="chatbot"
    else
        export CF_APP="chatbot-dev"
    fi
echo "Done."
}

setEnvVars() {
  echo "Setting app environment variables"
  if [ "$TRAVIS_BRANCH" = "master" ]; then
      export REACT_APP_ENV="production"
      export REACT_APP_API_ADDRESS="$REACT_APP_API_ADDRESS_PRD"
  else
      export REACT_APP_ENV="development"
      export REACT_APP_API_ADDRESS="$REACT_APP_API_ADDRESS_DEV"
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

#name app properly according to environment
setAppName;
#setting variables variable
setEnvVars;
#Download ibmcloud cli, auth and set targets
#setCloudFoundry;

# Build App
yarn build

# PUSH APP
ibmcloud cf push "${CF_APP}${APP_BLUEGREEN_SUFFIX}" -n "${CF_APP}" -f "${MANIFEST_APP}" --no-start;

# Setting Env
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" REACT_APP_ENV ${REACT_APP_ENV}
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" REACT_APP_API_ADDRESS ${REACT_APP_API_ADDRESS}
ibmcloud cf restage "${CF_APP}${APP_BLUEGREEN_SUFFIX}"
# Start app
ibmcloud cf start "${CF_APP}${APP_BLUEGREEN_SUFFIX}"

# BLUEGREEN DEPLOY OF APP
if ibmcloud cf delete "${CF_APP}" -f; then
    renameApplication
    else
    renameApplication
fi
