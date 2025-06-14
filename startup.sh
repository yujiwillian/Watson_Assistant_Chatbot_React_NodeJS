#!/bin/sh
echo "-----> Dumping environment variables..."
env | sort

echo "-----> Replacing environment variables on NGINX conf"
sed -i "s~NGINX_BACKEND_SERVICE_URL~${NGINX_BACKEND_SERVICE_URL}~" /etc/nginx/conf.d/nginx.conf

echo "-----> Building..."
yarn build --production
cp -r /app/build/* /usr/share/nginx/html
rm -r /app

echo "-----> Starting..."
nginx -g "daemon off;"