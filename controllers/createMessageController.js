const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

async function getCreateMessage(req, res) {
  if (!req.isAuthenticated()) return res.redirect("/login");
  res.render("createMessage");
}

async function postCreateMessage(req, res) {
  const { title, text } = req.body;
  await db.createMessage(req.user.user_id, title, text);
  res.redirect("/");
}

getCreateMessage = asyncHandler(getCreateMessage);
postCreateMessage = asyncHandler(postCreateMessage);

module.exports = { getCreateMessage, postCreateMessage };
