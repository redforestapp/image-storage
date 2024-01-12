import { Image } from "../persistence/database/models/image";
import { Task } from "../persistence/database/models/task";
import { uuid } from "uuidv4";
import sharp from "sharp";
import axios from "axios";

export const findImageByUuid = async (uuid: string) => {
  const image = await Image.findOne({ where: { uuid } });
  return image
    ? {
        image: image.image,
        mimeType: image.mimeType,
      }
    : undefined;
};

export const startImageProcessing = async (url: string) => {
  const taskUuid = uuid();
  const task = Task.build({
    status: "NEW",
    uuid: taskUuid,
    parameters: {
      url,
    },
  });
  await task.save();
  return taskUuid;
};

export const processImage = async (uuid: string, url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const image = await sharp(response.data).png().toBuffer();
  await Image.build({
    image,
    uuid,
    mimeType: "image/png",
  }).save();
};
