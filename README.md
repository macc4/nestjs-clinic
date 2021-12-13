# itrex-internship

## Information:

### Documentation and SQL diagram:

Swagger Documentation can be accessed (after running the server) via:
http://127.0.0.1:${API_PORT}/api-docs

SQL Diagram can be found here:
https://drawsql.app/personal-261/diagrams/clinic#

### Postman:

Collection with all of the requests that were used is attached and can be imported into Postman.
For it to properly work, create a new postman environment, and add variables:

- URL: http://127.0.0.1
- jwt: null
- auth_port: 4040
- clinic_port: 4041
- profile_port: 4042

## Installation:

### 0. Insert your data in the .env file or use the precreated one.

In the global .env file you can edit ports for each API, in local service .env files you can edit settings/ports for specific API.

### 1. Run the containers via docker:

```sh
cd itrex-internship/
docker-compose up -d
```

To stop the containers run:

```sh
docker-compose down
```

## Tests:

To test the app, run (in separate services):

```sh
cd itrex-internship/
yarn install
yarn test
```
