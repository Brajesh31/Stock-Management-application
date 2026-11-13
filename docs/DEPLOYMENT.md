# Deployment and Production Readiness

## 1. Current deployment status

The application is not production-ready. The source contains hard-coded secrets and database settings, local-only CORS configuration, inconsistent ownership enforcement, and a backend start-script mismatch. Do not deploy it with real inventory or user data until the critical items below are resolved.

## 2. Configuration required

Move these settings out of source code:
- MongoDB connection URI.
- JWT signing and verification secret.
- Server port.
- Allowed frontend origins.
- Any future email, storage, or external service credentials.

Use the hosting provider's secret manager. Never place server secrets in React environment variables because browser build variables are public.

## 3. Startup command

The tracked server entrypoint is `backend/index.js`, but the backend package start script currently references a missing `server.js`. Correct and test the start command before configuring a process manager or container.

The current server uses port 5000. Configure the reverse proxy to forward API traffic to the service and serve the frontend separately or through a deliberate static hosting configuration.

## 4. Security hardening checklist

Before public exposure:
1. Generate a strong random JWT secret and load it from environment configuration.
2. Verify token expiration and revocation behavior.
3. Scope every item query, update, and delete to the authenticated user.
4. Correct the middleware's missing-token check ordering.
5. Handle unknown users before calling bcrypt comparison.
6. Add authentication rate limits and abuse monitoring.
7. Configure a strict CORS origin allowlist.
8. Validate and normalize all request bodies.
9. Add request size limits and secure HTTP headers.
10. Use HTTPS for all client/server traffic.
11. Ensure errors do not leak stack traces, secrets, or user existence.
12. Review dependency vulnerabilities and update packages deliberately.

## 5. Database readiness

- Use a dedicated database and restricted database user.
- Apply least-privilege permissions.
- Resolve the item-name unique-index conflict.
- Plan schema and index migrations.
- Enable encrypted backups.
- Test restoration, not just backup creation.
- Monitor connection errors, slow queries, and storage growth.

## 6. Frontend build and hosting

Build the React client with `npm run build` in `frontend/`. Configure its API origin for the target environment. Do not ship a localhost API URL in a production build.

Serve static assets over HTTPS and configure client-side route fallback if using browser history routing. Confirm that the deployed frontend origin is included in the backend CORS allowlist.

## 7. Operational controls

A production service should have:
- Health/readiness endpoints.
- Structured request logs with sensitive fields redacted.
- Error monitoring and alerting.
- Database backup and restore procedures.
- Dependency update process.
- Incident response contact and vulnerability reporting.
- A rollback procedure for application and database migrations.

## 8. Release verification

After deployment, verify registration, login, token expiry, logout, stock CRUD, cross-user access denial, frontend refresh behavior, and error handling using dedicated test accounts and non-sensitive sample inventory. A successful frontend build alone is not a release approval.
