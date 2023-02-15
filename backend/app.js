const express = require("express");
const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");
const cors = require("cors");
const ErrorController = require("./controllers/errorController");
require("dotenv").config();
const morgan = require("morgan");

const app = express(); // application level middle-ware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todoRouter);

module.exports = app;
