var express = require("express");
var router = express.Router(); // route level middle-ware (index)
const TodoController = require("../controllers/todoController.js");
const AuthController = require("../controllers/authController.js");
require("dotenv").config();

router.param("id", (req, res, next, val) => {
  console.log(`${val}`);
  next();
});

router
  .route("/")
  .get(AuthController.protect, TodoController.getAllTodos)
  .post(AuthController.protect, TodoController.createTodo)
  .put(AuthController.protect, TodoController.updateAllTodos)
  .delete(AuthController.protect, TodoController.deleteAllTodos);

router
  .route("/:id")
  .get(AuthController.protect, TodoController.getTodo)
  .put(AuthController.protect, TodoController.updateTodo)
  .delete(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    TodoController.deleteTodo
  );

module.exports = router;
