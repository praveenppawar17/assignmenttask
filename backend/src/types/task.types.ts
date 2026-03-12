import { TASK_PRIORITY, TASK_STATUS } from "../constants";
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export type TaskPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];

export type CreateTaskBody = {
  title: string;
  description?: string;
  projectId: string;
  status?: TaskStatus;
};

export type UpdateTaskBody = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export type TaskQuery = {
  projectId: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
};
