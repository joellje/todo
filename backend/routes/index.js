var express = require("express");
var router = express.Router(); // route level middle-ware (index)
const TodoController = require("../controllers/todoController");
require("dotenv").config();

/* GET home page. */
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
  .delete(TodoController.deleteTodo);

router.route("/:id/:completed").put(TodoController.updateTodo);

module.exports = router;
