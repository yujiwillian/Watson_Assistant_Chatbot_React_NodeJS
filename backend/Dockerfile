FROM node:14-alpine

# update so image
RUN apk update && apk upgrade

# Create app directory, this is in our container/in our image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# USER appuser

EXPOSE 8000
CMD [ "node", "dist/main" ]
