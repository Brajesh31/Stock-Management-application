# API reference

The backend mounts the stock router at `/api/stock` and authentication router at `/auth`.

## Stock routes

| Method | Path | Purpose | Authentication |
|---|---|---|---|
| GET | `/api/stock/allItem` | List current user's stock | Required |
| GET | `/api/stock/getOneItem/:id` | Retrieve one stock item | Required |
| POST | `/api/stock/addItem` | Create a stock item | Required |
| PUT | `/api/stock/modifyItem/:id` | Modify a stock item | Required |
| DELETE | `/api/stock/deleteItem/:id` | Delete a stock item | Required |
| GET | `/api/stock/getUserData/` | Read current user's profile data | Required |

The exact authentication route paths and request schemas should be confirmed in `backend/routes/authRoutes.js`. The route handlers use Express Validator for item name, quantity, price, and date checks. Error responses are not fully standardized yet.
