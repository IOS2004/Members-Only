const createMessageRouter = require("express").Router();
const controller = require("../controllers/createMessageController");

createMessageRouter.get("/", controller.getCreateMessage);
createMessageRouter.post("/", controller.postCreateMessage);

module.exports = createMessageRouter;
