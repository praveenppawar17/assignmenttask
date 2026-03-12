import Task from "../models/task.model";
import { CreateTaskBody, TaskQuery, UpdateTaskBody } from "../types/task.types";

export const createTaskService = async (
  data: CreateTaskBody & { userId: string },
) => {
  const task = await Task.create(data);
  return task;
};

export const getTasksService = async (taskQuery: TaskQuery) => {
  const { projectId, status, priority, dueDate } = taskQuery;

  const filter = {
    projectId,
    ...(status && { status }),
    ...(priority && { priority }),
    ...(dueDate && { dueDate }),
  };

  return Task.find(filter);
};

export const updateTaskService = async (
  taskId: string,
  data: UpdateTaskBody,
) => {
  const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

export const deleteTaskService = async (taskId: string) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};
