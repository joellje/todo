const Todo = require("../models/todoModel");

exports.getAllTodos = (req, res, next) => {
  res.status(200).json("All Todos");
};

exports.createTodo = (req, res, next) => {
  res.status(200).json("Create Todo");
};

exports.getTodo = (req, res, next) => {
  id = req.params.id;
  res.status(200).json(`Todo ${id}`);
};

exports.deleteTodo = (req, res, next) => {
  console.log("Delete Todo");
};

exports.updateTodo = (req, res, next) => {
  console.log("Update Todo");
};
