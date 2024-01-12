import { fork, spawn } from "child_process";
import { Task } from "../persistence/database/models/task";

const tasksRunned = new Set();
export const taskScheduler = () => {
  setInterval(runTasks, 2000);
};

const runTasks = async () => {
  if (tasksRunned.size < 10) {
    const task = await Task.findOne({
      where: {
        status: "NEW",
      },
    });
    if (task != null) {
      task.status = "PROCESSING";
      await task.save();
      const imageProcessingTask = fork(__dirname + "/imageProcessTask.js");
      imageProcessingTask.on("message", taskDone);
      imageProcessingTask.send({ uuid: task.uuid, url: task.parameters.url });
    }
  }
};

const taskDone = async (uuid: string) => {
  tasksRunned.delete(uuid);
  const task = await Task.findOne({
    where: {
      uuid,
    },
  });
  if (task != null) {
    task.status = "DONE";
    await task.save();
  }
};
