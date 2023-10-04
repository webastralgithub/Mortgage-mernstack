const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todo.controller");
const { verifyToken } = require("../middleware/middleware"); // Import the verifyToken middleware

// Apply the verifyToken middleware to restrict access
router.post("/create", verifyToken, TodoController.createTodo);
router.get("/get", verifyToken, TodoController.getAllTodos);
router.get("/get/:id", verifyToken, TodoController.getTodoById);
router.put("/update/:id", verifyToken, TodoController.updateTodo);
router.delete("/delete/:id", verifyToken, TodoController.deleteTodo);

module.exports = router;
