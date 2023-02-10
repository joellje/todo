var express = require("express");
var router = express.Router(); // route level middle-ware (index)
const TodoController = require("../controllers/todoController");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json("Hello");
  console.log("Hello");
});

router.param("id", (req, res, next, val) => {
  console.log(`${val}`);
  next();
});

router
  .route("/")
  .get(TodoController.getAllTodos)
  .post(TodoController.createTodo);

router
  .route("/:id")
  .get(TodoController.getTodo)
  .delete(TodoController.deleteTodo)
  .put(TodoController.updateTodo);

module.exports = router;
