# Campus Maintenance Requests API (ICT251 Activity 7)

Express + PostgreSQL backend. CommonJS. Made-up data only.

## Run locally
1. `npm install` (creates package-lock.json and node_modules)
2. Copy `.env.example` to `.env` and set `DATABASE_URL` (a local or hosted Postgres database)
3. `npm run setup` (creates the table and inserts 9 starting records, only once)
4. `npm start`, then open http://localhost:3000

## Routes
GET `/`, GET `/health`, GET/POST `/api/records`, GET/PUT/DELETE `/api/records/:id`

## Deploy (Render)
Build command `npm install`, start command `npm start`.
Environment variables: `DATABASE_URL`, `STUDENT_NUMBER`, `CLIENT_ORIGINS` (your Activity 6/8 frontend address).
