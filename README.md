# Task-Managment-System

Build a backend service for a Task Management System that allows users to create, manage, and prioritize tasks efficiently. The service should support scheduling tasks, assigning priorities, and reordering tasks based on their priority.

## Installing dependencies

```
npm install
```

### To create and start docker container of node app and postgress db

```bash
docker-compose up --build
```

### To migrate existing tables

```bash
npm run migrate
```

### To create a new migration (Table)

```bash
npx prisma migrate dev --name your_migration_name
```

### To analyzing the code to find and fix potential errors, enforce coding standards, and improve code quality (Only for development perpose)

```bash
npm run lint
```

## List of endpoints (Note: Apply changes but not able to see swagger api-docs because having issue)

- `/`: endpoint used to check status
- `/api-docs`: swagger documentation for all endpoints

### To run app locally

- To run locally set `POSTGRES_HOST=localhost` then perform below command

- To run from docker container set `POSTGRES_HOST=postgres_db` then perform below command

```bash
npm run dev
```

## Build production app

```
npm run build
```

## Run the service locally in production mode

```
npm start
```


## Project structure

This is node project structure which are located `./src`. The packages are:

- `plugins` - contains all plugins which are used for database swagger-ui.
- `routes` - contains the routes which handles request, responses.
- `schema` - contains request, response schema which are used in swagger.
- `services` - contains functions which are perform database queries to insert, update, delete and fetch the data.

## Remaining Points:

- How to test the APIs
- Write unit tests for: API endpoints. 
- Validations

