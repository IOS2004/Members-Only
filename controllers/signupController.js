const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const validateSignup = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const user = await db.getUserByEmail(email);
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password too short"),
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name too short"),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name too short"),
  body().custom((_, { req }) => {
    if (req.body.password !== req.body.confirm_password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

function getSignup(req, res) {
  if (req.isAuthenticated()) return res.redirect("/");
  res.render("signup");
}

postSignup = [
  validateSignup,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const sendError = errors.array().map((e) => e.msg);
      return res.status(400).render("signup", { errors: sendError });
    }
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
  }),
];

module.exports = { getSignup, postSignup };
