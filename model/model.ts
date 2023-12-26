import { Schema, model, Document } from "mongoose";
import { iTaskData } from "../utils/interfaces";

const iTaskSchema = new Schema(
  {
    task: {
      type: String,
      require: [true, "Enter your task"],
    },
    priority: {
      type: String,
      require: [true, "Enter your priority"],
    },
    description: {
      type: String,
      require: [true, "Give task description"],
    },
    success: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const iTaskModel = model<iTaskData>("tasks", iTaskSchema);
