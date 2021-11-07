FROM node:16-alpine

WORKDIR /usr/apps/clinic

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build