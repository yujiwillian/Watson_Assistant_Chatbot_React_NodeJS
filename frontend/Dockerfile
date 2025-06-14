FROM node:14-alpine AS builder

ARG REACT_APP_API_ADDRESS=no-api-address-set.error.site.com.br
ENV NODE_ENV production

WORKDIR /app
COPY package*.json ./
COPY yarn.lock .
RUN yarn install --production=false

COPY . .

# Bundle static assets with nginx
FROM nginx:1.21.6-alpine as production


RUN apk update && apk upgrade

ARG REACT_APP_API_ADDRESS
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app /app

# Add nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d

# Expose port
EXPOSE 8080

# Installing yarn to allow build step on startup file
ENV ALPINE_MIRROR "http://dl-cdn.alpinelinux.org/alpine"
RUN mv /etc/apk/repositories /etc/apk/repositories.bak
RUN touch /etc/apk/repositories
RUN echo "${ALPINE_MIRROR}/v3.14/main/" >> /etc/apk/repositories
RUN apk add nodejs --repository="http://dl-cdn.alpinelinux.org/alpine/v3.14/main/"
RUN apk add npm --repository="http://dl-cdn.alpinelinux.org/alpine/v3.14/main/"
RUN mv /etc/apk/repositories.bak /etc/apk/repositories
RUN npm install yarn@1.22.18 -g



# Start nginx
RUN chmod +x /app/startup.sh
CMD ["/app/startup.sh"]
