# itrex-internship

## Information:

SQL Diagram can be found here:
https://drawsql.app/personal-261/diagrams/clinic#

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
