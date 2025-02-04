const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

function getSignup(req, res) {
  if (req.isAuthenticated()) return res.redirect("/");
  res.render("signup");
}

async function postSignup(req, res) {
  const isAdmin = req.body.admin === "on" ? true : false;
  const isMember = isAdmin ? true : false;
  const { email, password, firstName, lastName } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);
  await db.createUser(
    email,
    hashed_password,
    firstName,
    lastName,
    isAdmin,
    isMember
  );
  const user = await db.getUserByEmail(email);
  await new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
  res.redirect("/");
}

postSignup = asyncHandler(postSignup);
module.exports = { getSignup, postSignup };
