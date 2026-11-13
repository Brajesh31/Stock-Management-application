# Architecture and Request Lifecycle

## 1. System overview

The application has two independently installed JavaScript projects:

- A React client under `frontend/`.
- An Express API under `backend/`.

The client is responsible for rendering screens, collecting form data, maintaining client-side UI state, and making HTTP requests. The server is responsible for authentication, request validation, database access, and JSON responses. MongoDB stores user, token, and inventory documents.

```text
Browser
  |
  | React routes, forms, Redux state
  v
Frontend components and Axios calls
  |
  | HTTP request, token header
  v
Express application (port 5000)
  |
  +--> Authentication routes/controllers
  |
  +--> Stock routes
          |
          +--> Validation middleware
          |
          +--> JWT/session middleware
          |
          +--> Stock controller
                  |
                  v
              Mongoose models
                  |
                  v
               MongoDB
```

This is the intended request flow inferred from the tracked modules. Exact client endpoint usage should be confirmed when changing API contracts.

## 2. Frontend structure

The React application lives in `frontend/src/`.

### Application shell

- `App.js` is the root React application component.
- `index.js` mounts the application.
- `App.css` and `index.css` contain global and application styles.
- `PrivateRoutes.js` contains route-gating behavior and should be reviewed whenever authentication state changes.

### Feature components

The component tree is organized by user-facing feature:
- `authentication/`: sign-in and sign-up flows.
- `dashboard/`: stock dashboard.
- `card/`: reusable item card presentation.
- `dataContainer/`: stock data presentation.
- `details/`: item detail view.
- `editForm/`: item modification form.
- `forms/`: new stock item form.
- `navbar/` and `sidebarnav/`: navigation.
- `profile/`: user profile view.

Each feature may have a component file, CSS, prop definitions, and an index export. Keep UI changes within the relevant feature and update shared navigation or state only when needed.

### Client state

The `redux/` directory contains action types, actions, reducers, and a store. The current application includes stock and navigation state. Redux state is client-side state; it is not an authorization boundary. The server must independently verify the identity and ownership of every requested record.

### HTTP client

Axios is part of the frontend dependency set. API base URLs and token attachment behavior should be centralized rather than scattered across components. Do not put server secrets into frontend environment variables. Any value bundled into a browser build can be inspected by the user.

## 3. Backend structure

### Entry point

`backend/index.js`:
1. Imports and starts the MongoDB connection helper.
2. Creates the Express application.
3. Configures CORS for the local frontend origin.
4. Enables JSON and URL-encoded request parsing.
5. Mounts stock routes at `/api/stock`.
6. Mounts authentication routes at `/auth`.
7. Starts the listener on port 5000.

The tracked entrypoint is `index.js`. The package manifest's current start script references `server.js`, which is not present in the tracked backend directory. This mismatch must be corrected before using `npm start`.

### Routes

- `routes/authRoutes.js` defines registration, login, and logout endpoints.
- `routes/stockRoutes.js` defines item CRUD and profile endpoints.
- Stock routes use express-validator rules and the authentication middleware.

### Controllers

- `Controller/authController.js` handles registration, login, and logout.
- `Controller/stockController.js` handles item creation, listing, retrieval, modification, deletion, and user data.

Controllers should remain responsible for translating validated request data into model operations and consistent HTTP responses. Avoid duplicating authorization logic across route handlers.

### Middleware

`authenticationMiddleware.js` extracts the authorization token, checks the token model, verifies the JWT, and attaches user claims to the request. Its current ordering and error handling contain issues documented in [security policy](../SECURITY.md).

### Database layer

`db.js` connects Mongoose to a local MongoDB database. The URI is currently embedded in source code. Production configuration must use an environment variable and a startup failure policy that prevents the API from accepting requests before the database is ready.

## 4. Authentication lifecycle

The current sign-up controller hashes the supplied password using bcrypt and stores a user record. The sign-in controller finds a user by email, compares the supplied password with the stored hash, signs a JWT, and stores the token in a token collection. The middleware later checks the token record and verifies the JWT.

A robust lifecycle should also define:
- Password policy and input normalization.
- Unique email and username constraints.
- Login rate limiting and abuse monitoring.
- JWT secret rotation and expiration policy.
- Token revocation and expiry cleanup.
- Secure token transport and client storage.
- Logout behavior when a token is expired or already revoked.
- Generic authentication error messages that do not disclose account existence.

The current implementation does not fully address these concerns.

## 5. Stock-item lifecycle

A typical stock operation should follow this sequence:
1. The client submits a request with an item payload.
2. Express parses the request body.
3. Validation middleware checks field shape and constraints.
4. Authentication middleware establishes the user identity.
5. The controller performs a database query scoped to that identity.
6. Mongoose applies schema validation and indexes.
7. The controller returns a status code and JSON response.
8. The client updates or refreshes the visible stock state.

The most important invariant is ownership: every read, update, and delete must be constrained by both the item identifier and authenticated user identifier. The current update and delete controller queries do not consistently enforce this invariant. Treat that as a security defect, not a minor implementation detail.

## 6. Error boundaries

The current controllers use a mixture of 200, 400, 401, 500, and other responses. Some handlers do not immediately return after sending a validation error, which can lead to subsequent code attempting another response. A future API-hardening change should standardize error responses and ensure every failure branch exits immediately.

## 7. Scaling boundaries

The current code is a single Express process with a single MongoDB connection and no documented queue, cache, or background worker. If the project grows, add pagination, query indexes, structured logging, request correlation IDs, health checks, and measured database connection-pool settings. Do not introduce infrastructure without a demonstrated requirement.
