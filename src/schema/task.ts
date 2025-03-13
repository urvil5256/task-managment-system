const taskResponseSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    description: { type: "string" },
    dueDate: { type: "string", format: "date-time" },
    priority: { type: "integer" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

const TaskSchema = {
  tags: ["Task"],
  description: "Get Task Details",
  querystring: {
    type: "object",
    properties: {
      priority: { type: "integer" },
      dueDateStart: { type: "string", format: "date-time" },
      dueDateEnd: { type: "string", format: "date-time" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        tasks: {
          type: "array",
          items: taskResponseSchema,
        },
      },
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

export { TaskSchema };
