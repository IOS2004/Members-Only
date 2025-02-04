const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const validateMessage = [
  body("title").trim().isLength({ min: 5 }).withMessage("Title too short"),
  body("text").trim().isLength({ min: 10 }).withMessage("Text too short"),
];

async function getCreateMessage(req, res) {
  if (!req.isAuthenticated()) return res.redirect("/login");
  res.render("createMessage");
}

const postCreateMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const sendError = errors.array().map((e) => e.msg);
      return res.status(400).render("createMessage", { errors: sendError });
    }
    const { title, text } = req.body;
    await db.createMessage(req.user.user_id, title, text);
    res.redirect("/");
  },
];

getCreateMessage = asyncHandler(getCreateMessage);

module.exports = { getCreateMessage, postCreateMessage };
