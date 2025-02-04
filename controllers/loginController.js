const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const validateLogin = [
  body("username").trim().isEmail().withMessage("Invalid email"), // username is email
  body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const sendError = errors.array().map((e) => e.msg);
      return res.status(400).render("login", { errors: sendError });
    }
    next();
  },
];

async function getLogin(req, res) {
  if (req.isAuthenticated()) return res.redirect("/");
  res.render("login");
}

getLogin = asyncHandler(getLogin);

module.exports = { getLogin, validateLogin };
