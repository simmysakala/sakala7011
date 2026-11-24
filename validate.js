// Validation shared by the record routes. Rules match the data agreement
// (and Activity 6): id, title, category, description, status.

const STATUSES = ["Pending", "In progress", "Completed"];
const MAX_ID = 2147483647; // largest value of a Postgres integer column

// Returns { id } for a valid id, or { error } for text that is not a positive whole number.
// An id that is valid but too large for the database cannot exist, so it is flagged as tooLarge.
function parseId(value) {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    return { error: "Id must be a positive whole number." };
  }
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id > MAX_ID) {
    return { id: null, tooLarge: true };
  }
  return { id };
}

// Checks the four editable fields. Any client-supplied id is ignored.
// Returns { values: [title, category, description, status] } or { error: message }.
function validateBody(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be a JSON object with title, category, description and status." };
  }

  const rules = [
    { key: "title", label: "Title", min: 3, max: 80 },
    { key: "category", label: "Category", min: 2, max: 40 },
    { key: "description", label: "Description", min: 5, max: 300 }
  ];

  const values = [];
  for (const rule of rules) {
    const raw = body[rule.key];
    if (typeof raw !== "string") {
      return { error: `${rule.label} is required and must be text.` };
    }
    const text = raw.trim();
    if (text.length < rule.min || text.length > rule.max) {
      return { error: `${rule.label} must have ${rule.min} to ${rule.max} characters.` };
    }
    values.push(text);
  }

  const status = body.status;
  if (typeof status !== "string" || !STATUSES.includes(status.trim())) {
    return { error: "Status must be Pending, In progress or Completed." };
  }
  values.push(status.trim());

  return { values };
}

module.exports = { STATUSES, parseId, validateBody };
