const pool = require("./pool");

// Database queries
async function createUser(email, password, firstName, lastName, isAdmin) {
  await pool.query(
    `INSERT INTO users (email, password, first_name, last_name, isAdmin)
    VALUES ($1, $2, $3, $4, $5)`,
    [email, password, firstName, lastName, isAdmin]
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
    id,
  ]);
  return rows[0];
}

module.exports = { createUser, getUserByEmail, getUserById };
