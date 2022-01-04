FROM node:16-alpine

WORKDIR /usr/apps/notifications

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build