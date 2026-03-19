import { Types } from "mongoose";
import Project, { IProject } from "../models/project.model";
import Task from "../models/task.model";
import { CreateTaskBody, TaskQuery, UpdateTaskBody } from "../types/task.types";
import { ApiError } from "../utils/ApiError";

export const createTaskService = async (
  data: CreateTaskBody & { userId: string },
) => {
  const project = await Project.findOne({
    _id: data.projectId,
    userId: data.userId,
  });

  if (!project) {
    throw new Error("Unauthorized project");
  }
  const task = await Task.create({
    ...data,
  projectId: new Types.ObjectId(data.projectId)
});
  return task;
};

export const getTasksService = async (taskQuery: TaskQuery) => {
  const { projectId, status, priority, dueDate,userId } = taskQuery;

  const project = await Project.findOne({
    _id: projectId,
    userId,
  });

  if (!project) {
    throw new ApiError(401,"Unauthorized project");
  }
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
  userId:string
) => {
  const task = await Task.findById(taskId).populate("projectId");
  if (!task) {
    throw new Error("Task not found");
  }
  const project = task.projectId as IProject;
  if (project.userId.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  Object.assign(task, data);
  await task.save();
  return task;
};

export const deleteTaskService = async (taskId: string, userId: string) => {
    const task = await Task.findById(taskId).populate("projectId");
  
  if (!task) {
    throw new Error("Task not found");
  }
  const project = task.projectId as IProject;
  if (project.userId.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await task.deleteOne();
  return task;
};
