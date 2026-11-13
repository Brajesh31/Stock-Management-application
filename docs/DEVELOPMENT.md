# Development

Install dependencies independently:

```bash
cd backend && npm ci
cd ../frontend && npm ci
```

Start MongoDB locally, then start the backend using the actual entrypoint after verifying its configuration. The current package script points to a missing `server.js`; the tracked Express entrypoint is `index.js`.

Start the frontend with `npm start` from `frontend/`. The client build can be checked with `npm run build`.

Before changing stock routes, inspect both the controller and frontend Axios calls. Preserve the response envelope and status-code contract or update both sides together. Add tests for cross-user access, missing records, invalid IDs, and malformed payloads.
