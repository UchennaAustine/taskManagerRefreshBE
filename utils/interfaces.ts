export interface iTask {
  task: string;
  priority: string;
  description: string;
  success: boolean;
}

export interface iTaskData extends iTask, Document {}
