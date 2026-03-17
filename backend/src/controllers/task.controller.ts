import { Request, Response } from "express";
import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service";

import { CreateTaskBody, UpdateTaskBody, TaskQuery } from "../types/task.types";
import { sendResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/ApiError";

// Create Task
export const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
) => {
  try {
    const task = await createTaskService({
      ...req.body,
      userId: req.user!.id,
    });
    console.log("task... ", task);
    return sendResponse(res, 201, task, "Task created successfully");
  } catch (error) {
    if (error instanceof ApiError){
      return sendResponse(res, 500, undefined, error.message);
    }
    return sendResponse(res, 500, undefined, "Internal Server Error");
  }
};

export const getTasks = async (
  req: Request<{}, {}, {}, TaskQuery>,
  res: Response,
) => {
  try {
    const { projectId, status, priority, dueDate } = req.query;
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "projectId is required",
      });
      return;
    }

    const tasks = await getTasksService({
      projectId,
      status,
      priority,
      dueDate,
      userId: req.user!.id
    });

    const message =
      tasks.length === 0
        ? "No tasks found for this project"
        : "Tasks fetched successfully";

    return sendResponse(res, 200, tasks, message);
  } catch (error) {
    if (error instanceof ApiError) {
      return sendResponse(res, 500, undefined, error.message);
    }
    return sendResponse(res, 500, undefined, "Internal Server Error");
  }
};

export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response,
) => {
  try {
    const task = await updateTaskService(req.params.id, req.body, req.user!.id);
    return sendResponse(res, 200, task, "Task updated successfully");
  } catch (error) {
    if (error instanceof ApiError) {
      return sendResponse(res, 404, undefined, error.message);
    }
    return sendResponse(res, 500, undefined, "Something went wrong");
  }
};

// Delete Task
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const task = await deleteTaskService(req.params.id, req.user!.id);
    return sendResponse(res, 200, task, "Task deleted successfully");
  } catch (error) {
    if (error instanceof ApiError){
      return sendResponse(res, 500, undefined, error.message);
    }
    return sendResponse(res, 500, undefined, "Internal Server Error");
  }
};
