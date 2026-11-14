# Stock Management Application

A full-stack inventory management prototype built with a React 18 frontend and an Express/MongoDB backend. The application is organized around user authentication and stock-item operations. The frontend provides screens for signing in and registering, viewing a dashboard, browsing stock records, viewing item details, creating and editing items, and accessing profile information. The backend exposes authentication and stock routes, stores users and inventory records in MongoDB, hashes passwords with bcrypt, and uses JWTs to represent authenticated sessions.

This repository is a development prototype. It is not safe to deploy with real user, customer, or inventory data until the security and data-integrity issues in this README and the security documentation have been resolved.

## Technology stack

| Layer | Technologies visible in the repository |
|---|---|
| Frontend | React 18, React Router, Redux Toolkit, React Redux, Axios |
| UI | Material UI, Emotion, styled-components, Font Awesome |
| Forms and feedback | React Final Form, React Toastify |
| Backend | Node.js, Express 4 |
| Persistence | MongoDB, Mongoose |
| Authentication | bcrypt, jsonwebtoken, token model |
| Validation | express-validator |
| Testing | React Testing Library/Jest-related packages, Mocha/Chai dependencies |

## Repository layout

```text
.
├── backend/
│   ├── Controller/          # Authentication and stock controllers
│   ├── models/              # User, item, and token schemas
│   ├── routes/              # Express route definitions
│   ├── index.js             # Express application and listener
│   ├── db.js                # MongoDB connection
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Auth, dashboard, cards, forms, profile, navigation
│   │   ├── redux/           # Actions, reducers, state management
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── docs/
```

## Requirements

- Node.js and npm.
- A running MongoDB instance.
- Two terminal sessions for frontend and backend development.
- A browser with modern JavaScript support.

Use the committed lockfiles when installing dependencies. The backend and frontend are separate npm projects and must be installed separately.

## Installation

### Backend dependencies

```bash
cd backend
npm ci
```

### Frontend dependencies

Open another terminal:

```bash
cd frontend
npm ci
```

## Local startup and current entrypoint mismatch

The tracked backend entrypoint is `backend/index.js`. It connects to MongoDB and starts an Express listener on port 5000. However, the backend package's current `start` script points to `server.js`, which is not present in the tracked backend tree. The existing script also uses Windows-specific `SET NODE_ENV=dev` syntax.

For a local inspection run, after configuring MongoDB, execute the tracked entrypoint directly:

```bash
cd backend
node index.js
```

The frontend uses Create React App scripts:

```bash
cd frontend
npm start
```

The frontend development server normally starts on port 3000. The backend CORS configuration currently allows `http://localhost:3000`.

## Main application capabilities

- User registration and sign-in screens.
- Password hashing during registration.
- JWT creation during sign-in.
- Token-backed authentication middleware.
- Stock-item creation with item name, quantity, price, description, date, and manufacturing company.
- Listing and retrieving stock items.
- Editing and deleting stock records.
- Dashboard, item detail, profile, navigation, and form components.

The exact routes and request details are documented in [API reference](docs/API.md). These are descriptions of the current code, not guarantees of production readiness.

## Data model overview

A stock item contains a user reference and fields for item name, quantity, price, description, date, and manufacturing company. The model currently has both a globally unique item-name field and a compound unique index combining item name and user. Those constraints are inconsistent with the apparent intent of allowing different users to use the same item name.

See [data model](docs/DATA-MODEL.md) before changing indexes or migrating data.

## Configuration warning

The backend currently hard-codes:
- MongoDB URI: `mongodb://127.0.0.1:27017/Stock_App`.
- JWT signing secret: the literal string `secret`.
- CORS origin: `http://localhost:3000`.
- Backend port: `5000`.

These values are development assumptions, not deployment configuration. The JWT secret must be moved to a high-entropy environment variable and used consistently for signing and verification. Database credentials must never be committed.

## Critical security and correctness gaps

1. The JWT secret is hard-coded and weak.
2. MongoDB connection settings are hard-coded.
3. Stock update and delete controller operations do not consistently include the authenticated owner in their database query.
4. The authentication middleware queries the token collection before checking whether a token was supplied.
5. The login controller can attempt to compare a password when no matching user exists.
6. Logout and token lifecycle behavior needs consistent error handling.
7. The item schema's unique index declarations conflict.
8. The backend package start command points to a missing file.
9. The CORS policy is hard-coded for local development.
10. Authentication routes need rate limiting and stronger operational controls.

Do not deploy this code with real data until these issues are addressed and tested. See [security policy](SECURITY.md) and [deployment guide](docs/DEPLOYMENT.md).

## Documentation

- [Architecture and request lifecycle](docs/ARCHITECTURE.md)
- [API reference](docs/API.md)
- [Data model and indexes](docs/DATA-MODEL.md)
- [Development workflow](docs/DEVELOPMENT.md)
- [Deployment checklist](docs/DEPLOYMENT.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)

## Validation

The CI workflow installs backend and frontend dependencies, builds the frontend, and checks backend JavaScript syntax. This does not prove that MongoDB integration, authentication, authorization, or end-to-end stock operations are correct. Those require dedicated integration tests against an isolated database.

## Project status

The repository currently demonstrates a multi-page inventory application and a basic API structure. It should be considered an educational or development-stage project until authentication, tenant isolation, database constraints, validation, deployment configuration, and automated tests are hardened.

Last updated: 2026-11-14 11:49 UTC
