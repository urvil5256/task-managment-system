import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerPlugins = () => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task Prioritization System",
        description:
          "Build a backend service for a Task Management System that allows users to create, manage, and prioritize tasks efficiently. The service should support scheduling tasks, assigning priorities, and reordering tasks based on their priority using Express TypeScript with Swagger API",
        version: "8.15.0",
      },
    },
    apis: ["src/routes/task/index.ts"],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  const router = express.Router();

  router.use(
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: { docExpansion: "list", deepLinking: false },
    })
  );

  return router;
};

export default swaggerPlugins;
