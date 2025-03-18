import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, due_date, priority } = req.body;
    const task = await prisma.task.create({
      data: { title, description, due_date, priority },
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

    const parsedPriority = priority ? Number(priority) : null;
    if (priority && parsedPriority !== null && isNaN(parsedPriority)) {
      res.status(400).json({ error: "Invalid priority value" });
      return;
    }

    const parsedDueStart = due_start ? new Date(due_start as string) : null;
    const parsedDueEnd = due_end ? new Date(due_end as string) : null;

    if (
      (parsedDueStart && isNaN(parsedDueStart.getTime())) ||
      (parsedDueEnd && isNaN(parsedDueEnd.getTime()))
    ) {
      res
        .status(400)
        .json({ error: "Invalid date format for due_start or due_end" });
      return;
    }

    const tasks = await prisma.task.findMany({
      where: {
        priority: parsedPriority ?? undefined,
        due_date:
          parsedDueStart && parsedDueEnd
            ? { gte: parsedDueStart, lte: parsedDueEnd }
            : undefined,
      },
      orderBy: { priority: "desc" },
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

const getOverdueTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      where: { due_date: { lt: new Date() } },
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
    const { title, description, due_date, priority } = req.body;
    const { id } = req.params;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, due_date, priority },
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
    const updates: { id: number; priority: number }[] = req.body;
    if (!Array.isArray(updates)) {
      res
        .status(400)
        .json({ error: "Invalid payload format. Expected an array of tasks." });
      return;
    }
    await prisma.$transaction(
      updates.map(({ id, priority }) =>
        prisma.task.update({
          where: { id },
          data: { priority },
        })
      )
    );
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
