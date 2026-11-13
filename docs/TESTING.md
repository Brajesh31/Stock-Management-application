# Testing and Quality Strategy

## 1. What the current CI verifies

The workflow installs dependencies in both projects, builds the frontend, and parses backend JavaScript files. It does not start MongoDB, execute the API, run authentication flows, or test user ownership boundaries.

## 2. Frontend validation

Run:

```bash
cd frontend
npm ci
npm run build
```

The repository contains component test files for cards, edit forms, and navigation. Use the configured test runner to execute them interactively or in CI after confirming the project test environment is compatible with the current dependencies.

Test:
- Sign-in and sign-up form validation.
- Empty dashboard and populated dashboard.
- Stock card rendering.
- Item detail loading and missing record behavior.
- Edit and create form validation.
- Navigation visibility for authenticated and unauthenticated states.
- API error and loading states.

## 3. Backend validation

Run dependency installation and syntax checks:

```bash
cd backend
npm ci
find . -path './node_modules' -prune -o -name '*.js' -type f -print0 | xargs -0 -r -n1 node --check
```

Syntax validation does not test database operations. Add integration tests using a dedicated disposable MongoDB database.

## 4. Authentication test matrix

| Case | Expected secure behavior |
|---|---|
| Valid registration | User created and password stored as a hash |
| Duplicate email | Conflict returned without duplicate user |
| Valid login | Token issued with configured expiry |
| Unknown email | Generic authentication failure |
| Incorrect password | Generic authentication failure |
| Missing token | 401 response before database token lookup |
| Malformed token | Rejected |
| Expired token | Rejected |
| Revoked token | Rejected |
| Logout | Token revoked and cannot be reused |

## 5. Tenant isolation matrix

Create two test users, A and B. Create at least one stock item for each user.

- User A can list only A's records.
- User A can retrieve A's record.
- User A cannot retrieve B's record.
- User A cannot modify B's record by guessing its ID.
- User A cannot delete B's record by guessing its ID.
- User B's data remains unchanged after all A operations.

This test matrix is essential because the current update and delete controller queries do not consistently enforce owner scoping.

## 6. Data validation matrix

Test missing item name, too-short name, negative quantity, decimal quantity, zero price, decimal price, invalid date, future date, duplicate item name, invalid MongoDB ID, missing record, and database connection failure.

Confirm that the API returns the correct status code and a stable error response for each case.

## 7. Test data and secrets

Use fake emails, synthetic item records, and a dedicated test database. Never run tests against production data. Do not commit access tokens, database URIs, passwords, or real customer inventory.
