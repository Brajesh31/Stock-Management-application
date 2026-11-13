# Security Policy

## Reporting

Report suspected vulnerabilities privately through GitHub's security reporting feature where available. Do not publish exploit details or real customer information in an issue.

## Current high-priority risks

- JWT signing uses a hard-coded string secret in the authentication controller and middleware.
- MongoDB connection details are hard-coded.
- The stock update and delete controller queries do not consistently scope records by the authenticated user.
- The token lookup occurs before the missing-token check in middleware.
- Login code assumes a matching user exists before calling bcrypt.
- CORS is restricted to a fixed localhost origin and is not configurable for deployment.

Do not use this prototype with sensitive or production data until these issues are fixed, tested, and reviewed.
