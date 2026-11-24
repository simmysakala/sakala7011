const router = require("express").Router();
const pool = require("../db");
const { parseId, validateBody } = require("../validate");

const COLUMNS = "id, title, category, description, status";

function badRequest(res, message) {
  return res.status(400).json({ message });
}

function notFound(res) {
  return res.status(404).json({ message: "Record not found." });
}

// GET /api/records - read all records
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT ${COLUMNS} FROM records ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /api/records/:id - read one record
router.get("/:id", async (req, res, next) => {
  try {
    const parsed = parseId(req.params.id);
    if (parsed.error) return badRequest(res, parsed.error);
    if (parsed.tooLarge) return notFound(res);

    const result = await pool.query(`SELECT ${COLUMNS} FROM records WHERE id = $1`, [parsed.id]);
    if (result.rows.length === 0) return notFound(res);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// POST /api/records - create a record (any id in the body is ignored)
router.post("/", async (req, res, next) => {
  try {
    const checked = validateBody(req.body);
    if (checked.error) return badRequest(res, checked.error);

    const result = await pool.query(
      "INSERT INTO records (title, category, description, status) " +
      `VALUES ($1, $2, $3, $4) RETURNING ${COLUMNS}`,
      checked.values
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /api/records/:id - replace the four editable fields
router.put("/:id", async (req, res, next) => {
  try {
    const parsed = parseId(req.params.id);
    if (parsed.error) return badRequest(res, parsed.error);

    const checked = validateBody(req.body);
    if (checked.error) return badRequest(res, checked.error);
    if (parsed.tooLarge) return notFound(res);

    const result = await pool.query(
      "UPDATE records SET title = $1, category = $2, description = $3, status = $4 " +
      `WHERE id = $5 RETURNING ${COLUMNS}`,
      [...checked.values, parsed.id]
    );
    if (result.rows.length === 0) return notFound(res);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/records/:id - delete a record
router.delete("/:id", async (req, res, next) => {
  try {
    const parsed = parseId(req.params.id);
    if (parsed.error) return badRequest(res, parsed.error);
    if (parsed.tooLarge) return notFound(res);

    const result = await pool.query("DELETE FROM records WHERE id = $1 RETURNING id", [parsed.id]);
    if (result.rows.length === 0) return notFound(res);
    res.status(200).json({ message: "Record deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
