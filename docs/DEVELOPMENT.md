# Development Workflow

## 1. Prerequisites

Install a supported Node.js release and npm. A MongoDB instance is needed for runtime integration. The frontend and backend have separate manifests and lockfiles.

## 2. Install dependencies

Backend:

```bash
cd backend
npm ci
```

Frontend, in a separate terminal:

```bash
cd frontend
npm ci
```

Use the lockfile in each directory. Do not run a single root-level install and assume both applications are configured.

## 3. Configure local database

The current `backend/db.js` hard-codes a local MongoDB URI. The existing code therefore expects MongoDB to be available at the local host and database path shown in that file.

This is a known configuration limitation. For a real deployment, move the URI into an environment variable and fail startup clearly when the required setting is missing. Do not commit a real database URI or password.

## 4. Start backend

The tracked backend entrypoint is `index.js`:

```bash
cd backend
node index.js
```

The package's `start` script currently points to `server.js`, which is not tracked in the backend directory. It also uses Windows-specific environment assignment syntax. Until the manifest is corrected, invoking `node index.js` is the direct local command.

The API listens on port 5000 and mounts stock routes under `/api/stock` and authentication routes under `/auth`.

## 5. Start frontend

```bash
cd frontend
npm start
```

The frontend is a Create React App project. Its development server normally uses port 3000. The backend CORS configuration currently permits that exact local origin.

## 6. Frontend build

```bash
cd frontend
npm run build
```

The build verifies that the React application can be bundled. It does not verify API connectivity, authentication, database behavior, or authorization.

## 7. Backend syntax validation

The CI workflow runs Node's parser against tracked backend JavaScript files:

```bash
find . -path './node_modules' -prune -o -name '*.js' -type f -print0 | xargs -0 -r -n1 node --check
```

This is a syntax check only. It does not execute controllers or connect to MongoDB.

## 8. Working on frontend features

For a new screen:
1. Identify the route and navigation entry.
2. Reuse existing feature components where possible.
3. Keep network calls consistent with existing response contracts.
4. Update Redux state only where shared state is required.
5. Handle loading, empty, success, and error states.
6. Test at the target viewport sizes.
7. Ensure no secret is embedded in the client build.

## 9. Working on backend features

For a new endpoint:
1. Define the route and HTTP method.
2. Add request validation.
3. Apply authentication middleware.
4. Scope database access by the authenticated user.
5. Handle missing records and validation failures explicitly.
6. Return a stable JSON response.
7. Add controller and route tests.
8. Update `docs/API.md`.

## 10. Test strategy

The repository includes frontend test scaffolding and backend test dependencies, but CI currently does not run a complete integration suite. Add tests for:
- Registration and login.
- Wrong password and unknown user.
- Expired, malformed, and revoked tokens.
- User A cannot read, update, or delete User B's items.
- Required item fields and invalid values.
- Duplicate item names under the intended uniqueness rule.
- Missing MongoDB and database operation failures.
- Frontend loading, validation, and error states.

Use an isolated test database with synthetic data.
