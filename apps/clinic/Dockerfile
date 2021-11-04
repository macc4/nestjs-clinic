FROM node:16-alpine

WORKDIR /usr/apps/clinic

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build