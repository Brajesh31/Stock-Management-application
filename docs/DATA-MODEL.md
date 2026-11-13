# Data Model and Persistence

## 1. Persistence technology

The backend uses MongoDB through Mongoose. The tracked model files are:
- `models/User.js`
- `models/Items.js`
- `models/token.js`

The connection helper is `db.js`. It currently points to a local MongoDB URI and database name. Do not assume the database is production-ready or externally configured.

## 2. User records

The user model is used by authentication and profile retrieval. Registration hashes the password with bcrypt before saving the record. The login flow searches by email and compares the submitted password with the stored hash.

Before deployment, ensure that email and username uniqueness are enforced at the database level, password hashes are never serialized to clients, and user profile responses explicitly select safe fields.

## 3. Stock item schema

The visible item schema includes:

| Field | Type | Required | Meaning |
|---|---|---:|---|
| `User` | ObjectId reference | Yes | Owner of the item |
| `itemName` | String | Yes | Inventory item name |
| `quantity` | Number | Yes | Stock quantity |
| `price` | Number | Yes | Item price |
| `description` | String | Yes | Item description |
| `date` | Date | Yes | Associated item date |
| `manufacturingCompany` | String | Yes | Manufacturer name |

The schema references the user model using the `User` property. Queries and population must use the correct field and model reference.

## 4. Unique-index conflict

The schema declares `itemName` as globally unique and also declares a compound unique index on `itemName` and `User`. A global unique index prevents two users from storing the same item name, making the compound per-user index redundant for that case.

If the intended business rule is unique item names per user, remove the global uniqueness declaration and retain the compound index. That is a schema and data migration change. Before changing it:
1. Back up the database.
2. Inspect existing duplicate names.
3. Check current index definitions in MongoDB.
4. Plan index removal and creation.
5. Test the migration on a copy.
6. Deploy the application and index changes in a coordinated order.

Do not modify indexes on a live database without a migration and rollback plan.

## 5. Ownership invariant

Every item belongs to one user. All database operations must enforce this ownership relationship:
- List by owner ID.
- Read by item ID and owner ID.
- Update by item ID and owner ID.
- Delete by item ID and owner ID.

Frontend route guards and hidden buttons do not replace server-side ownership checks.

## 6. Quantity and price semantics

The current schema stores quantity and price as JavaScript numbers. The route validators use integer checks for quantity and price. This implies fractional quantities and fractional currency values may not be accepted through those routes.

If the application needs decimal currency, define a precise representation such as integer minor units or a decimal type with explicit rounding rules. Avoid floating-point arithmetic for financial totals without a documented precision strategy.

## 7. Token records

The token model stores issued JWT values for session tracking and logout. Storing complete bearer tokens increases the impact of a database disclosure. A stronger design can store a cryptographic hash of each token, its user ID, issue time, expiry time, and revocation time. This requires coordinated changes to sign-in, middleware, and logout behavior.

## 8. Backup and recovery

Before production use, define:
- Automated database backups.
- Retention windows.
- Encryption at rest and in transit.
- Restore drills.
- Index and schema migration records.
- Monitoring for failed connections and storage growth.

No backup or recovery automation is currently documented in the repository.
