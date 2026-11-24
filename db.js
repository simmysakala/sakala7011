require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
}

// Hosted databases (Render, Neon, Supabase) need SSL. A local database does not.
const isLocal = /@(localhost|127\.0\.0\.1)(:|\/|$)/.test(connectionString || "");
const useSsl = process.env.DATABASE_SSL
  ? process.env.DATABASE_SSL === "true"
  : !isLocal;

const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000, // 5 s
});

// Stops an unexpected idle-connection error from crashing the whole server.
pool.on("error", (error) => {
  console.error("Unexpected database error:", error.message);
});

module.exports = pool;
