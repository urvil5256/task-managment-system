import type { Request, Response, NextFunction } from "express";
import TaskSchema from "./taskSchema.ts";
import ConvertToISO8601 from "./convertToISO8601.ts";

const ValidateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { due_date } = req.body;

  if (due_date) {
    const isoDue_Date = ConvertToISO8601(due_date);

    if (!isoDue_Date) {
      res
        .status(400)
        .json({ error: "Due date must be a valid ISO 8601 timestamp" });
      return;
    }

    req.body.due_date = isoDue_Date;
  }

  const result = TaskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.format() });
    return;
  }

  next();
};

export default ValidateTask;
