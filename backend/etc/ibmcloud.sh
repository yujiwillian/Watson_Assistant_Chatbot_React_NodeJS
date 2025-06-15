#!/bin/sh

repo_host="clis.cloud.ibm.com"
os_name=$(uname -s | tr '[:upper:]' '[:lower:]')
if [ "$os_name" = "linux" ]; then
    arch=$(uname -m | tr '[:upper:]' '[:lower:]')
    if echo "$arch" | grep -q 'x86_64'
    then
        platform="linux64"
    elif echo "$arch" | grep -q -E '(x86)|(i686)'
    then
        platform="linux32"
    elif echo "$arch" | grep -q 'ppc64le'
    then
        platform="ppc64le"
    else
        echo "Unsupported Linux architecture: ${arch}. Quit installation."
        exit 1
    fi
else
    echo "Unrecognized Linux platform: ${os_name}. Quit installation."
    exit 1
fi

# Only use sudo if not running as root:
[ "$(id -u)" -ne 0 ] && SUDO=sudo || SUDO=""

url="https://${repo_host}/download/bluemix-cli/latest/${platform}"
checksum_url="https://${repo_host}/download/bluemix-cli/latest/${platform}/checksum"
file_name="IBM_Cloud_CLI.tar.gz"

echo "Current platform is ${platform}. Downloading corresponding IBM Cloud CLI..."


if curl -L $url -o /tmp/${file_name}
then
    echo "Download complete. Executing installer..."
else
    echo "Download failed. Please check your network connection. Quit installation."
    exit 1
fi


remote_checksum=$(curl -L $checksum_url)
calculated_checksum=$(sha1sum /tmp/${file_name} | awk '{print $1}')
if [ "$remote_checksum" != "$calculated_checksum" ]; then
    echo "Downloaded file is corrupted. Quit installation."
    exit 1
fi

cd /tmp || exit
tar -xvf /tmp/${file_name}
chmod 755 /tmp/Bluemix_CLI/install

if $SUDO /tmp/Bluemix_CLI/install -q ; then
    echo "Install complete."
else
    echo "Install failed."
fi

rm -rf /tmp/Bluemix_CLI
rm /tmp/${file_name}