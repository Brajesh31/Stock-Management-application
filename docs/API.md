# Backend API Reference

## 1. Base paths

The Express application mounts:
- Authentication routes under `/auth`.
- Stock routes under `/api/stock`.

The server currently listens on port 5000. A local stock endpoint therefore has the form `http://localhost:5000/api/stock/...`.

The exact authentication route definitions should be read from `backend/routes/authRoutes.js` before changing the client. This document does not invent endpoint names that are not confirmed in the route file.

## 2. Stock endpoints

| Method | Route | Purpose | Authentication |
|---|---|---|---|
| GET | `/api/stock/allItem` | List items for the current user | Required |
| GET | `/api/stock/getOneItem/:id` | Retrieve one item | Required |
| POST | `/api/stock/addItem` | Create a stock item | Required |
| PUT | `/api/stock/modifyItem/:id` | Update a stock item | Required |
| DELETE | `/api/stock/deleteItem/:id` | Delete a stock item | Required |
| GET | `/api/stock/getUserData/` | Retrieve current user profile data | Required |

## 3. Authentication header

The middleware reads the token from the HTTP `Authorization` header. Confirm the frontend sends the exact token format expected by the middleware. The current middleware looks up the complete header value in the token collection before verifying the JWT. A conventional scheme such as `Bearer <token>` must be implemented consistently on both sides if adopted.

Never include a real token in documentation, screenshots, issue reports, or logs.

## 4. Create stock item

Route: `POST /api/stock/addItem`

Expected fields based on the controller and validator:
- `itemName`: string, at least three characters.
- `quantity`: integer greater than or equal to zero.
- `price`: integer greater than zero.
- `date`: date value accepted by the route's custom validator.
- `description`: required by the Mongoose schema.
- `manufacturingCompany`: required by the Mongoose schema.

The authenticated user ID is attached by middleware and used when creating the document. The response currently returns an object containing `item` and `success`.

## 5. List stock items

Route: `GET /api/stock/allItem`

The controller queries items using the authenticated user ID and populates the user reference. The response contains `allProducts` and `success`.

Pagination, sorting, and filtering are not documented as implemented. A large inventory can therefore become expensive to retrieve in one request.

## 6. Retrieve one item

Route: `GET /api/stock/getOneItem/:id`

The controller searches by both document ID and authenticated user ID. If no record is found, it returns a 400 response with a generic message. A more conventional API would return 404 for a missing or inaccessible record without revealing whether another user's record exists.

## 7. Modify item

Route: `PUT /api/stock/modifyItem/:id`

The route validates item name, quantity, price, and date. The controller updates the document and returns `updatedData` and `success`.

**Security warning:** the current controller's initial lookup and update query are based on the item ID and do not consistently include the authenticated user ID. This creates a cross-user modification risk. Do not expose this endpoint to untrusted users until it is fixed and tested.

## 8. Delete item

Route: `DELETE /api/stock/deleteItem/:id`

The controller deletes by item ID. The current query does not consistently scope the operation to the authenticated user. This creates a cross-user deletion risk. Authorization must be enforced in the database query, not only in the frontend.

## 9. User data

Route: `GET /api/stock/getUserData/`

The controller uses the username attached by authentication middleware and excludes the password and MongoDB ID from the selected fields. Review all returned user fields before adding new profile properties.

## 10. Validation and error handling

The routes use express-validator for several item fields. The controller currently returns inconsistent response shapes and sometimes continues after sending a validation error. Client code should not rely on a single generic error message to distinguish validation, authorization, and server failures.

## 11. Recommended future API contract

Before production, define and test a versioned API contract with:
- Consistent JSON error envelope.
- Correct 400, 401, 403, 404, 409, and 500 status usage.
- Explicit pagination and sort parameters.
- Owner-scoped database operations for every stock endpoint.
- Field validation shared between create and update.
- Request size limits and rate limiting.
- OpenAPI documentation generated from the actual routes.

These are recommendations, not claims about current functionality.
