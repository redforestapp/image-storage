import { Router, Request, Response, NextFunction } from "express";
import { findImageByUuid, startImageProcessing } from "../domain/image.service";

const images = Router();

images.get(
  "/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const image = await findImageByUuid(req.params.uuid);
      if (image) {
        res.setHeader("Content-Type", image.mimeType);
        res.end(image.image, "binary");
      } else {
        res.status(404).send("Image is not found");
      }
    } catch (e) {
      next(e);
    }
  }
);

images.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    console.log(req.body);

    res.json(await startImageProcessing(req.body.url));
  } catch (e) {
    next(e);
  }
});

export { images };
