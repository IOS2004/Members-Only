const membershipRouter = require("express").Router();
const controller = require("../controllers/membershipController");

membershipRouter.get("/", controller.getMembership);
membershipRouter.post("/", controller.postMembership);

module.exports = membershipRouter;
