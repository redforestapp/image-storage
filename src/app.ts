import express from "express";
import { migrate } from "./persistence/database/migrate";
import { useRoutes } from "./api/routes";
import { taskScheduler } from "./tasks/taskScheduler";
import bodyParser from "body-parser";

const app = express();

const start = async (): Promise<void> => {
  try {
    await migrate();

    taskScheduler();

    app.use(bodyParser.json());
    useRoutes(app);

    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
