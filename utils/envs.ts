import dotenv from "dotenv";
dotenv.config();

export const envs = {
  port: process.env.port!,
  dbUrl: process.env.dbUrl as string,
};
