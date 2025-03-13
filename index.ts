import dotenv from "dotenv";
import express, { type Express } from "express";
import swaggerPlugins from "./src/plugins/swagger/index.ts";
import * as routeModules from "./src/routes/index.ts";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerPlugins());
app.use(express.json());

const registerRoutes = (app: Express) => {
  for (const routeModule of Object.values(routeModules)) {
    if (routeModule && routeModule.default) {
      if (typeof routeModule.default === "function") {
        app.use(routeModule.default);
      } else {
        console.error("Invalid route export:", routeModule);
      }
    }
  }
};

registerRoutes(app);

app.get("/", (_req, res) => {
  res.send("Hello!!!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
