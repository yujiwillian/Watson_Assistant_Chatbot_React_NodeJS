#!/bin/sh
export APP_BLUEGREEN_SUFFIX='-green';
export APP_DOMAIN="mybluemix.net";
export MANIFEST_APP="./manifest.yml";

setAppName() {
  echo "Naming app..."
  if [ "$TRAVIS_BRANCH" = "master" ]; then
        export NODE_ENV="production"
        export CF_APP="ms-sp-assistant-api"
    else
        export NODE_ENV="development"
        export CF_APP="ms-sp-assistant-api-dev"
    fi
  echo "Done."
}

setCloudFoundry() {
        
  echo "Installing IBM Cloud CLI..."
  curl -sL https://ibm.biz/idt-installer | bash
  echo "Done."

  echo"Installing CF plugin to IBM Cloud CLI"
  ibmcloud cf install

  echo "Authenticating to IBM Cloud..."
  ibmcloud config --check-version false
  ibmcloud login --apikey $IBM_CLOUD_KEY -r us-south
  ibmcloud target -o "${IBM_CLOUD_ORG}" -s "${IBM_CLOUD_SPACE}"
}

renameApplication () {
  ibmcloud cf rename "${CF_APP}${APP_BLUEGREEN_SUFFIX}" "${CF_APP}";
  exit 0;
}

#name app properly according to environment
setAppName;
#Download ibmcloud cli, auth and set targets
setCloudFoundry;
# PUSH APP
ibmcloud cf push "${CF_APP}${APP_BLUEGREEN_SUFFIX}" -n "${CF_APP}" -f "${MANIFEST_APP}";
# Setting Env 
ibmcloud cf set-env "${CF_APP}${APP_BLUEGREEN_SUFFIX}" NODE_ENV ${NODE_ENV}
ibmcloud cf restage "${CF_APP}${APP_BLUEGREEN_SUFFIX}"
# Start app
ibmcloud cf start "${CF_APP}${APP_BLUEGREEN_SUFFIX}"
# BLUEGREEN DEPLOY OF APP

if ibmcloud cf delete "${CF_APP}" -f; then
  renameApplication
  else
  renameApplication
fi