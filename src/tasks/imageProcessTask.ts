import { processImage } from "../domain/image.service";
import "../persistence/database/sequelize";

process.on("message", async (message: { uuid: string; url: string }) => {
  await processImage(message.uuid, message.url);
  // @ts-expect-error
  process.send(message.uuid);
});
