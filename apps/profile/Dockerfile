FROM node:16-alpine

WORKDIR /usr/apps/auth

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build