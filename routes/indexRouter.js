const db = require("../db/queries");
const indexRouter = require("express").Router();
const controller = require("../controllers/indexController");

indexRouter.get("/", controller.getIndex);

module.exports = indexRouter;
