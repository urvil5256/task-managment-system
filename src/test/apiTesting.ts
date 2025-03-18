import request from "supertest";
import express from "express";
import TaskRoutes from "../services/task.ts";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.post("/tasks", TaskRoutes.createTask);
app.get("/tasks", TaskRoutes.getAllTasks);
app.get("/tasks/overdue", TaskRoutes.getOverdueTasks);
app.put("/tasks/:id", TaskRoutes.updateTask);
app.delete("/tasks/:id", TaskRoutes.deleteTask);
app.post("/tasks/reorder", TaskRoutes.reorderTasks);

describe("Task API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a task", async () => {
    const mockTask = {
      id: 1,
      title: "Test Task",
      description: "Test Desc",
      due_date: "2025-03-18",
      priority: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

    const response = await request(app).post("/tasks").send(mockTask);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockTask);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: mockTask });
  });

  test("should get all tasks", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", due_date: "2025-03-18", priority: 1 },
      { id: 2, title: "Task 2", due_date: "2025-03-19", priority: 2 },
    ];

    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
    expect(prisma.task.findMany).toHaveBeenCalled();
  });

  test("should return overdue tasks", async () => {
    const mockTasks = [
      { id: 1, title: "Overdue Task", due_date: "2025-01-01" },
    ];

    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const response = await request(app).get("/tasks/overdue");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
  });

  test("should update a task", async () => {
    const mockTask = {
      id: 1,
      title: "Updated Task",
      due_date: "2025-03-18",
      priority: 1,
    };

    (prisma.task.update as jest.Mock).mockResolvedValue(mockTask);

    const response = await request(app).put("/tasks/1").send(mockTask);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTask);
  });

  test("should delete a task", async () => {
    (prisma.task.delete as jest.Mock).mockResolvedValue({});

    const response = await request(app).delete("/tasks/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Task deleted" });
  });

  test("should reorder tasks", async () => {
    const mockUpdates = [
      { id: 1, priority: 2 },
      { id: 2, priority: 1 },
    ];
    // prisma.$transaction.mockResolvedValue([]);
    (prisma.$transaction as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .post("/tasks/reorder")
      .send(mockUpdates);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Tasks reordered" });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });
});
