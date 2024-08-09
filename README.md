# Warehouse

## Requirements

Projects required Node > 20 and Docker installed locally. Contains
a `.nvmrc` file to handle auto switch to correct node version.

## Setup

1. Run `npm ci` to install all dependencies. It handles also dependencies in nested directories.
2. Run `docker-compose up -d` in root directory to run instance of MariaDB.
3. Go to `backend` directory and run `npm start` to run API.
4. Go to `frontend` directory and run `npm start` to run frontend application in serve mode.

## API

API is running on `http://localhost:3000`. On development purposes angular app has configured proxy to avoid CORS issues.

## Frontend

Frontend is running on `http://localhost:4200`.

## Database

Database is running on `http://localhost:3306`. Credentials are stored in `.env` file in root directory.

## Tests

To run tests go to `backend` directory and run `npm test`.
To run tests go to `frontend` directory and run `npm test`.

## Tools

Repository has configured Prettier and Husky to handle code formatting. On pre-commit hook it will run prettier to format code, so you don't have to worry about it.

## Bruno

Repository has a bruno workspace definition inside `.bruno` directory.
Bruno is a FOSS alternative to Postman. To learn more about bruno go to https://www.usebruno.com/
