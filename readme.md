# Zerodha Clone Demo

This repository contains a full-stack stock trading demo with:

- `backend/` — Express API with MongoDB data and signup/login endpoints
- `dashboard/` — React trading dashboard with holdings, positions, orders, and buy order placement
- `frontend/` — static landing pages and signup UI (not required for the dashboard demo)

## Run the demo

1. From the repository root, install dependencies:
   ```bash
   npm install
   npm run install-all
   ```

2. Start the demo app:
   ```bash
   npm start
   ```

3. Open the dashboard app in your browser:
   - `http://localhost:3000`

4. The backend runs at:
   - `http://localhost:3002`

## Key demo flows

- `/signup` — create a demo account
- `/login` — login with an existing account
- `/` — main dashboard with holdings and quick access
- `/orders` — view saved orders
- `/holdings` — view current holdings
- `/positions` — view open positions

## Notes

- Backend environment variables are loaded from `backend/.env`
- The backend uses MongoDB for demo data and seeding
- The dashboard app uses Axios to call `http://localhost:3002`
- If you want a clean install, delete `node_modules` and run `npm run install-all`
