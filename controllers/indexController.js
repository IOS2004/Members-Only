const { localsName } = require("ejs");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

async function getIndex(req, res) {
  const messages = await db.getAllMessages();
  const userMessages = await Promise.all(
    messages.map(async (message) => {
      const user = await db.getUserById(message.user_id);
      message.user = user;
      return message;
    })
  );
  res.render("index", { messages: userMessages });
}

async function deleteMessage(req, res) {
  const { message_id } = req.body;
  await db.deleteMessage(message_id);
  res.redirect("/");
}

getIndex = asyncHandler(getIndex);
deleteMessage = asyncHandler(deleteMessage);

module.exports = { getIndex, deleteMessage };
