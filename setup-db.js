// Creates the table and inserts the starting records.
// Run with:  npm run setup
// It uses DATABASE_URL, so it works for your local database and your hosted one.
const fs = require("fs");
const path = require("path");
const pool = require("./db");

async function main() {
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  const seed = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");
  await pool.query(schema);
  console.log("Table 'records' is ready.");
  await pool.query(seed);
  const result = await pool.query("SELECT COUNT(*) AS total FROM records");
  console.log(`Records in the table: ${result.rows[0].total}`);
}

main()
  .catch((error) => {
    console.error("Setup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
