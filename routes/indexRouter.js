const indexRouter = require("express").Router();
const controller = require("../controllers/indexController");

indexRouter.get("/", controller.getIndex);
indexRouter.post("/", controller.deleteMessage);

module.exports = indexRouter;
