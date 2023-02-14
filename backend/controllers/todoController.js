const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res, next) => {
  try {
    const result = await Todo.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    id = req.params.id;
    const result = await Todo.findById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    body = req.body;
    newtask = body["task"];
    complete = body["completed"];
    const newTodo = await Todo.create({ task: newtask, completed: complete });
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(400).json(err);
  }
  // check for unique todo name
};

exports.updateAllTodos = async (req, res, next) => {
  res.status(200).json("Update All Todos");
};

exports.updateTodo = async (req, res, next) => {
  try {
    id = req.params.id;
    complete = req.params.completed;
    const todo = await Todo.findById(id);
    console.log(todo);
    const result = await todo.set({ completed: complete });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteAllTodos = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  // return error when id not present
  try {
    targetid = req.params.id;
    const result = await Todo.deleteOne({ id: targetid });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
