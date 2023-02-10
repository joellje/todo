const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
