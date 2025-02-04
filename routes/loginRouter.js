const passport = require("passport");
const controller = require("../controllers/loginController");
const loginRouter = require("express").Router();

loginRouter.get("/", controller.getLogin);
loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = loginRouter;
