const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const ErrorController = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

require("dotenv").config();

const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");

const app = express(); // application level middle-ware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use(helmet()); //set security HTTP Headers

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use(limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
app.use(hpp());

//Routes
app.use("/", indexRouter);
app.use("/todos", todoRouter);
app.use("/users", userRouter);

// Catch-all Middleware
app.all("*", (req, res, next) => {
  const err = new Error("Page not Found.");
  next(err);
});

// Error Middeware
app.use(ErrorController);

module.exports = app;
