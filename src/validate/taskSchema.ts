import z from "zod";

const TaskSchema = z.object({
  title: z.string().min(1, { message: "Title must be a non-empty string" }),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Due date must be a valid ISO 8601 timestamp",
  }),
  priority: z
    .number()
    .int()
    .min(1, { message: "Priority must be at least 1" })
    .max(10, { message: "Priority must be at most 10" }),
});

export default TaskSchema;
