import { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import { iTaskModel } from "../model/model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { task, priority, description } = req.body;
    const assigned = await iTaskModel.create({
      task,
      priority,
      description,
    });
    return res.status(statusCode.CREATED).json({
      message: "task have being created",
      data: assigned,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: `Task creation Error: ${error.message}`,
      info: error,
    });
  }
};

export const viewTasks = async (req: Request, res: Response) => {
  try {
    const assigned = await iTaskModel.find();
    return res.status(statusCode.OK).json({
      message: `All Tasks:${assigned.length}`,
      data: assigned,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: `Viewing All Tasks Error: ${error.message}`,
      info: error,
    });
  }
};
export const viewSingleTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const assigned = await iTaskModel.findById(taskId);
    return res.status(statusCode.OK).json({
      message: `Single Task`,
      data: assigned,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: `Viewing All Tasks Error: ${error.message}`,
      info: error,
    });
  }
};
