const express = require(`express`);
const router = express.Router();
const {
  getTask,
  singleTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

router.get("/tasks", getTask);
router.get("/tasks/:id", singleTask);
router.post("/task", createTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id", updateTask);

module.exports = router;
