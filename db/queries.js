const pool = require("./pool");

// Database queries
async function createUser(
  email,
  password,
  firstName,
  lastName,
  isAdmin,
  isMember
) {
  await pool.query(
    `INSERT INTO users (email, password, first_name, last_name, isadmin, membership_status)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [email, password, firstName, lastName, isAdmin, isMember]
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

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT * FROM messages`);
  return rows;
}

async function createMessage(user_id, title, text) {
  await pool.query(
    `INSERT INTO messages (text, title, user_id)
    VALUES ($1, $2, $3)`,
    [text, title, user_id]
  );
}

async function createMembership(user_id) {
  await pool.query(
    `UPDATE users
    SET membership_status = true
    WHERE user_id = $1`,
    [user_id]
  );
}

async function deleteMessage(message_id) {
  await pool.query(`DELETE FROM messages WHERE message_id = $1`, [message_id]);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllMessages,
  createMessage,
  createMembership,
  deleteMessage,
};
