const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

async function getMembership(req, res) {
  if (!req.isAuthenticated()) return res.redirect("/login");
  res.render("membership");
}

async function postMembership(req, res) {
  const { secret_code } = req.body;
  const user_id = req.user.user_id;
  if (secret_code === process.env.SECRET_CODE)
    await db.createMembership(user_id);
  else {
    res.render("membership", { errors: ["Invalid secret code"] });
    return;
  }
  res.redirect("/membership");
}

getMembership = asyncHandler(getMembership);
postMembership = asyncHandler(postMembership);

module.exports = { getMembership, postMembership };
