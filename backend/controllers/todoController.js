const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res, next) => {
  try {
    const result = await Todo.find();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    targetId = req.params.id;
    const result = await Todo.findById(targetId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
    // res.status(400).json(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const body = req.body;
    const newtask = body["task"];
    const newTodo = await Todo.create({ task: newtask, completed: false });
    res.status(200).json(newTodo);
  } catch (err) {
    next(err);
  }
};

exports.updateAllTodos = async (req, res, next) => {
  res.status(200).json("Update All Todos");
};

exports.updateTodo = async (req, res, next) => {
  try {
    targetId = req.params.id;
    const todo = await Todo.findById(targetId);
    const result = await todo.set({ completed: !todo.completed }).save();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteAllTodos = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    targetId = req.params.id;
    const result = await Todo.deleteOne({ _id: targetId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
