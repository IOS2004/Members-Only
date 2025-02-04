const controller = require("../controllers/signupController");
const signupRouter = require("express").Router();

signupRouter.get("/", controller.getSignup);
signupRouter.post("/", controller.postSignup);

module.exports = signupRouter;
