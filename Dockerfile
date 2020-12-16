FROM node:12.16.1-alpine3.9
RUN apk update
RUN apk add bash
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD ["node","server.js"]
