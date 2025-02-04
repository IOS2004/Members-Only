const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const expressSession = require("express-session");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(expressSession);
const flash = require("connect-flash");
const PORT = process.env.PORT || 8080;

// Routers
const indexRouter = require("./routes/indexRouter");
const createMessageRouter = require("./routes/createMessageRouter");
const loginRouter = require("./routes/loginRouter");
const membershipRouter = require("./routes/membershipRouter");
const signupRouter = require("./routes/signupRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(flash());
app.use(passport.session());

require("./config/passport");

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  next();
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.use("/", indexRouter);
// app.use("/create-message", createMessageRouter);
app.use("/login", loginRouter);
// app.use("/membership", membershipRouter);
app.use("/sign-up", signupRouter);

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
