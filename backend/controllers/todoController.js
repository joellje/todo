const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res, next) => {
  try {
    const result = await Todo.find({ userId: req.user.id });
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
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const body = req.body;
    const newtask = body["task"];
    const newTodo = await Todo.create({
      task: newtask,
      completed: false,
      userId: req.user.id,
    });
    res.status(200).json(newTodo);
  } catch (err) {
    next(err);
  }
};

exports.completeAllTodos = async (req, res, next) => {
  try {
    const filter = { userId: req.user.id };
    const updateDoc = { completed: true };
    const result = await Todo.updateMany(filter, updateDoc);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
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
    const result = await Todo.deleteMany({ userId: req.user.id });

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
