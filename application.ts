import express, { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import cors from "cors";
import router from "./router/taskRouter";
import morgan from "morgan";

export const App = (app: Application) => {
  try {
    app.use(express.json());
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
      })
    );
    app.use(morgan("dev"));
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(statusCode.OK).json({
          message: "Api is Active",
        });
      } catch (error: any) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: `Api is currently inActive: ${error.message}`,
          info: error,
        });
      }
    });
    app.use("/api", router);
  } catch (error: any) {
    console.log(`App Error: ${error.message}`);
    console.log(error);
  }
};
