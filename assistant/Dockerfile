FROM node:lts-alpine

WORKDIR /usr/src/app
ENV PORT=8080

COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "sh", "-c", "npm start | npx pino-pretty" ]
