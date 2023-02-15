const mongoose = require("mongoose");
const validator = require("validator");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "Enter a task."],
    unique: [true, "Task is already present."],
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
