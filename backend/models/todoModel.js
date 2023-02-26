const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "Enter a task."],
  },
  completed: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: String,
  },
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
