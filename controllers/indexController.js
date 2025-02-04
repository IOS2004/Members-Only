const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

async function getIndex(req, res) {
  res.render("index");
}

getIndex = asyncHandler(getIndex);
module.exports = { getIndex };
