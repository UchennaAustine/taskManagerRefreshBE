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

export const doneWithTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await iTaskModel.findById(taskId);
    if (task) {
      const executed = await iTaskModel.findByIdAndUpdate(
        taskId,
        { success: true },
        { new: true }
      );
      if (task?.success === executed?.success) {
        return res.status(statusCode.UNAUTHORIZED).json({
          message: `Task has being executed already`,
        });
      } else {
        return res.status(statusCode.UPDATED).json({
          message: `Task has being executed`,
          data: executed,
        });
      }
    } else {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: `Task does not exist`,
      });
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: `Finishing Task Error ${error.message}`,
      info: error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const executed = await iTaskModel.findByIdAndDelete(taskId);
    return res.status(statusCode.DELETED).json({
      message: `Task has being executed`,
      data: executed,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: `Deleting Task Error ${error.message}`,
      info: error,
    });
  }
};
