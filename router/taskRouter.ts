import { Router } from "express";
import {
  createTask,
  viewSingleTask,
  viewTasks,
} from "../controller/taskController";

const router: Router = Router();

router.route("/create").post(createTask);
router.route("/tasks").get(viewTasks);
router.route("/:taskId/task").get(viewSingleTask);

export default router;
