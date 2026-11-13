# Deployment

Do not deploy the current code as-is with real user or inventory data.

Before deployment:
1. Replace the hard-coded MongoDB URI with a secret-backed environment variable.
2. Replace the hard-coded JWT secret in both signing and verification code with one strong secret.
3. Fix the backend start command to run the tracked entrypoint.
4. Configure CORS with an explicit production frontend origin allowlist.
5. Ensure every item lookup, update, and delete is scoped to the authenticated user.
6. Add request rate limits and consistent error handling to authentication endpoints.
7. Use TLS, secure token storage, database backups, and monitoring.
8. Build the frontend with its production API base URL and verify that no secrets are bundled into the client.

The current server binds to port 5000 and the frontend uses the Create React App development server by default. Configure hosting and reverse proxy behavior explicitly.
