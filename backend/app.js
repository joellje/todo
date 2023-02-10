const express = require("express");
const indexRouter = require("./routes/index");
require("dotenv").config();
const morgan = require("morgan");

const app = express(); // application level middle-ware
app.use(morgan("dev"));
app.use(express.json());

app.use("/todos", indexRouter);

module.exports = app;
