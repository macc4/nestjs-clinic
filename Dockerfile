FROM node:14

COPY . /app/

WORKDIR /app/

RUN yarn install

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "start:dev"]