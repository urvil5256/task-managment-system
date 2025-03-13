import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = await prisma.task.create({
      data: { title, description, dueDate, priority },
    });
    res.status(201).json(task);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { priority, due_start, due_end } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        ...(priority && { priority: parseInt(priority as string) }),
        ...(due_start &&
          due_end && {
            dueDate: {
              gte: new Date(due_start as string),
              lte: new Date(due_end as string),
            },
          }),
      },
      orderBy: { priority: "desc" },
    });
    res.status(200).json(tasks);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const getOverdueTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      where: { dueDate: { lt: new Date() } },
    });
    res.status(200).json(tasks);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const { id } = req.params;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, dueDate, priority },
    });
    res.status(200).json(task);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Task deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const reorderTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates: { id: string; priority: number }[] = req.body;
    for (const { id, priority } of updates) {
      await prisma.task.update({
        where: { id: parseInt(id) },
        data: { priority },
      });
    }
    res.status(200).json({ message: "Tasks reordered" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export default {
  createTask,
  getAllTasks,
  getOverdueTasks,
  updateTask,
  deleteTask,
  reorderTasks,
};
