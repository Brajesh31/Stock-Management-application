# Data model

## User

The user model is stored in MongoDB and is referenced by stock items. Passwords are hashed with bcrypt during registration. The frontend should never receive password hashes.

## Stock item

The Mongoose item schema includes:

- `User`: reference to the owning user
- `itemName`: required string
- `quantity`: required number
- `price`: required number
- `description`: required string
- `date`: required date
- `manufacturingCompany`: required string

The schema currently declares a globally unique `itemName` field as well as a compound unique index on `itemName` and `User`. Those constraints conflict with the apparent per-user uniqueness intent. Resolve the index design with a migration plan before changing production data.
