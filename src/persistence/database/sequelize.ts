import { Sequelize } from "sequelize-typescript";
import { Image } from "./models/image";
import { Task } from "./models/task";

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "Password123",
  database: process.env.DB_NAME || "forest-images",
  dialect: "postgres",
  models: [Image, Task],
  define: {
    timestamps: false,
  },
});

export { sequelize };
