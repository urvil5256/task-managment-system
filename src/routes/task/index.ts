import express from "express";
import TaskRoutes from "../../services/task.ts";

const router = express.Router();

router.post("/tasks", TaskRoutes.createTask);
router.get("/tasks", TaskRoutes.getAllTasks);
router.get("/tasks/overdue", TaskRoutes.getOverdueTasks);
router.put("/tasks/:id", TaskRoutes.updateTask);
router.delete("/tasks/:id", TaskRoutes.deleteTask);
router.post("/tasks/reorder", TaskRoutes.reorderTasks);

export default router;
