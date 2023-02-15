var express = require("express");
var router = express.Router(); // route level middle-ware (index)
const TodoController = require("../controllers/todoController.js");
const ErrorController = require("../controllers/errorController.js");
require("dotenv").config();

router.param("id", (req, res, next, val) => {
  console.log(`${val}`);
  next();
});

router
  .route("/")
  .get(TodoController.getAllTodos)
  .post(TodoController.createTodo)
  .put(TodoController.updateAllTodos)
  .delete(TodoController.deleteAllTodos);

router
  .route("/:id")
  .get(TodoController.getTodo)
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

router.use(ErrorController);

module.exports = router;
