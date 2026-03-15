// taskApi.ts

import type { ApiResponse } from "../types/common.types";
import type { CreateTaskInput, Task, TaskFilters } from "../types/task.types";
import { handleApiResponse } from "../utils/apiHandler";
import { api } from "./axiosClient";


export const fetchTasksApi = async (
  projectId: string,
  filters?: TaskFilters
): Promise<Task[]> => {
  const params: Record<string, string> = { projectId };

  if (filters?.status) params.status = filters.status;
  if (filters?.priority) params.priority = filters.priority;
  if (filters?.dueDate) params.dueDate = filters.dueDate;

  const { data } = await api.get<ApiResponse<Task[]>>("/tasks", { params });

  if (!data.data) throw new Error("Failed to fetch tasks");
  return data.data;
};


export const createTaskApi = async (
  payload: CreateTaskInput
): Promise<Task> => {

  const { data } = await api.post<ApiResponse<Task>>("/tasks", payload);

  return handleApiResponse(data);
};

export const updateTaskApi = async (
  id: string,
  payload: Partial<Task>
): Promise<Task> => {
  const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, payload);
  if (!data.data) throw new Error("Failed to update task");
  return data.data;
};

