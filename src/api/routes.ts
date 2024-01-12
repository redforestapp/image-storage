import { Express } from "express";
import { images } from "./image.controller";

function useRoutes(app: Express) {
  app.use("/images", images);
}

export { useRoutes };
