# Architecture

## Frontend

The React 18 client lives in `frontend/`. It uses React Router, Redux/Redux Toolkit, Axios, Material UI, and component-level CSS. Feature areas include authentication, dashboard, stock cards, item details, item editing, forms, navigation, and profile views.

## Backend

The Express service lives in `backend/`. It connects to MongoDB through Mongoose, mounts authentication routes at `/auth`, and mounts stock routes at `/api/stock`. Controllers implement sign-up/sign-in/logout and stock CRUD. JWT claims carry a user ID and username; a token model is also used for session tracking.

## Data flow

The client sends HTTP requests through Axios. Authenticated requests must include the token expected by the backend middleware. Stock documents reference a user document and include item name, quantity, price, description, date, and manufacturing company.

## Operational caveats

The tracked backend entrypoint is `index.js`, but the package start script points to `server.js`. The MongoDB URI and JWT secret are hard-coded. Correct these before production deployment.
