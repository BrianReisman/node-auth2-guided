# Node Auth 2 Guided Project

Guided project for **Node Auth 2** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.
- [Postman](https://www.postman.com/) installed.

## Project Setup

- [ ] clone this repository.
- [ ] move inside the project.
- [ ] type`npm i` to download dependencies.
- [ ] type `npx knex migrate:latest` to run the migrations.
- [ ] type `npx knex seed:run` to seed the db.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds support for `JSON Web Tokens (JWT)` to the API.

- ./api/errorHandler.js
- ./api/auth/auth-router.js
- ./api/auth/check-role-middleware-factory.js
- ./api/auth/restricted-middleware.js
- ./api/users/users-router.js