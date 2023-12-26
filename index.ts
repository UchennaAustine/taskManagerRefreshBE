import express, { Application } from "express";
import { App } from "./application";
import { envs } from "./utils/envs";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConfig";
dotenv.config();

process.on("uncaughtException", (error: Error) => {
  console.log(`Servers' Error is an uncaughtException Error: ${error.message}`);
  console.log(`uncaughtException Error: ${error}`);

  process.exit(1);
});

const port = envs.port;

const app: Application = express();

App(app);

const Server = app.listen(port || process.env.port, () => {
  dbConnection();
  console.log(`Server is Active on Port: ${port}`);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(`Servers' Error is an unhandledRejection Error: ${reason}`);

  Server.close(() => {
    process.exit(1);
  });
});
