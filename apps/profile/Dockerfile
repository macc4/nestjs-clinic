FROM node:16-alpine

WORKDIR /usr/apps/profile

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build