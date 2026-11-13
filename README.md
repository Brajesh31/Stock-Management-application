# Stock Management Application

A full-stack stock and inventory management prototype. The frontend is a React 18 application with Redux-based state management and Material UI components. The backend is an Express API using MongoDB/Mongoose, JWT-based sessions, bcrypt password hashing, and per-user stock records.

## Repository layout

- `frontend/`: React application, components, Redux store, and UI tests.
- `backend/`: Express application, authentication and stock controllers, Mongoose models, and route handlers.

## Requirements

- Node.js compatible with the lockfiles and package versions
- npm
- MongoDB
- Separate frontend and backend dependency installation

## Local setup

Backend:

```bash
cd backend
npm ci
```

Frontend:

```bash
cd frontend
npm ci
npm start
```

The backend package currently declares a start script that references `server.js`, while the tracked entrypoint is `index.js`. The backend also hard-codes the local MongoDB URI and JWT signing secret. These must be corrected and moved to environment configuration before deployment. See [development](docs/DEVELOPMENT.md) and [deployment](docs/DEPLOYMENT.md).

## API overview

Authenticated stock routes are mounted under `/api/stock`. The implemented route names include listing items, retrieving one item, creating, modifying, deleting, and reading the current user's profile. Authentication routes are mounted under `/auth`.

## Important security and correctness gaps

This repository is a development prototype, not a production-ready inventory service. The current code contains a hard-coded JWT secret, a hard-coded MongoDB URI, a fixed localhost CORS origin, and ownership checks that are inconsistent across update/delete handlers. Do not deploy with real user or inventory data until these are fixed and independently reviewed.

See [architecture](docs/ARCHITECTURE.md), [API notes](docs/API.md), [data model](docs/DATA-MODEL.md), and [security policy](SECURITY.md).
