import { z } from "zod";
import { TASK_STATUS } from "../constants";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    projectId: z.string().min(1, "ProjectId is required"),
    // status: z.enum(["Todo", "In Progress", "Completed"]).optional(),
    status: z.enum(Object.values(TASK_STATUS)).optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(Object.values(TASK_STATUS)).optional()
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid task id"),
  }),
});
