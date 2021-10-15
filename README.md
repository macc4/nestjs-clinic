# itrex-internship

## Information:

### Documentation and SQL diagram:

Swagger Documentation can be accessed (after running the server) via:
http://127.0.0.1/api-docs

SQL Diagram can be found here:
https://drawsql.app/personal-261/diagrams/clinic#

### Postman:

Collection with all of the requests that were used is attached and can be imported into Postman.
For it to properly work, create a new postman environment, and add variables:

- URL: http://127.0.0.1:8080
- jwt: null

## Installation:

### 0. Insert your data in the .env file or use the precreated one

### 1. Run the server and databases via docker:

```sh
cd itrex-internship/
docker-compose up -d
```

To stop the server run:

```sh
docker-compose down
```

## Tests:

To test the app, run:

```sh
cd itrex-internship/
yarn install
yarn test
```
