const asyncHandler = require("express-async-handler");

async function getLogin(req, res) {
  if (req.isAuthenticated()) return res.redirect("/");
  res.render("login");
}

getLogin = asyncHandler(getLogin);

module.exports = { getLogin };
