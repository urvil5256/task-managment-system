import express from "express";
import TaskRoutes from "../../services/task.ts";
import ValidateTask from "../../validate/validateTask.ts";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with a title, description, due date, and priority.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - due_date
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 example: "Finish Swagger Documentation"
 *               description:
 *                 type: string
 *                 description: Detailed description of the task
 *                 example: "Write Swagger documentation for the create task API"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Due date for the task (YYYY-MM-DDTHH:mm:ss.sssZ)
 *                 example: "2024-12-01T12:00:00.000Z"
 *               priority:
 *                 type: integer
 *                 description: Priority level of the task (e.g., 1 = High, 2 = Medium, 3 = Low)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created task
 *                   example: 123
 *                 title:
 *                   type: string
 *                   example: "Finish Swagger Documentation"
 *                 description:
 *                   type: string
 *                   example: "Write Swagger documentation for the create task API"
 *                 due_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-01T12:00:00.000Z"
 *                 priority:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request (invalid input or missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Title is required"
 */

router.post("/tasks", ValidateTask, TaskRoutes.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Get a list of all tasks with optional filters for priority and due date range.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: priority
 *         schema:
 *           type: integer
 *         description: Filter tasks by priority (Between 1 to 10)
 *         example: 1
 *       - in: query
 *         name: due_start
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering tasks (YYYY-MM-DDTHH:mm:ss.sssZ)
 *         example: "2024-12-01T12:00:00.000Z"
 *       - in: query
 *         name: due_end
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering tasks (YYYY-MM-DDTHH:mm:ss.sssZ)
 *         example: "2024-12-01T12:00:00.000Z"
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the task
 *                     example: 123
 */
router.get("/tasks", TaskRoutes.getAllTasks);

/**
 * @swagger
 * /tasks/overdue:
 *   get:
 *     summary: Retrieve overdue tasks
 *     description: Get a list of all tasks that are overdue (past their due date).
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Successfully retrieved overdue tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the task
 *                     example: 123
 *                   title:
 *                     type: string
 *                     description: Task title
 *                     example: "Submit project report"
 *                   description:
 *                     type: string
 *                     description: Task details
 *                     example: "Complete and submit the final project report"
 *                   due_date:
 *                     type: string
 *                     format: date
 *                     description: Task due date
 *                     example: "2024-12-01T12:00:00.000Z"
 *                   priority:
 *                     type: integer
 *                     description: Task priority level (Between 1 to 10)
 *                     example: 1
 *       400:
 *         description: Bad request (error retrieving tasks)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unknown error occurred"
 */
router.get("/tasks/overdue", TaskRoutes.getOverdueTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: Update a task's title, description, due date, and priority.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the task to update
 *         example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the task
 *                 example: "Complete API Documentation"
 *               description:
 *                 type: string
 *                 description: Updated details of the task
 *                 example: "Finalize Swagger documentation for all APIs"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Updated due date for the task (YYYY-MM-DDTHH:mm:ss.sssZ)
 *                 example: "2024-12-01T12:00:00.000Z"
 *               priority:
 *                 type: integer
 *                 description: Updated priority level of the task (Between 1 to 10)
 *                 example: 2
 *     responses:
 *       200:
 *         description: Task successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated task
 *                   example: 123
 *                 title:
 *                   type: string
 *                   example: "Complete API Documentation"
 *                 description:
 *                   type: string
 *                   example: "Finalize Swagger documentation for all APIs"
 *                 due_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-01T12:00:00.000Z"
 *                 priority:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Bad request (invalid task ID or input data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid task ID"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task not found"
 */
router.put("/tasks/:id", ValidateTask, TaskRoutes.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task from the system by its unique ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the task to delete
 *         example: 123
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted"
 *       400:
 *         description: Invalid task ID or other request errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid task ID"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task not found"
 */
router.delete("/tasks/:id", TaskRoutes.deleteTask);

/**
 * @swagger
 * /tasks/reorder:
 *   put:
 *     summary: Reorder tasks based on priority
 *     description: Update the priority of multiple tasks in a single request.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the task
 *                   example: 123
 *                 priority:
 *                   type: integer
 *                   description: The new priority level of the task (Between 1 to 10)
 *                   example: 1
 *     responses:
 *       200:
 *         description: Tasks successfully reordered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasks reordered"
 *       400:
 *         description: Bad request (invalid payload or update error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid payload format. Expected an array of tasks."
 */
router.post("/tasks/reorder", TaskRoutes.reorderTasks);

export default router;
