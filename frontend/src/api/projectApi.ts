import { api } from "./axiosClient";
import type { Project, CreateProjectInput, UpdateProjectInput } from "../types/project.types";
import type { ApiResponse } from "../types/common.types";

export const fetchProjectsApi = async (): Promise<ApiResponse<Project[]>> => {
  const { data } = await api.get<ApiResponse<Project[]>>("/projects");
  return data;
};

export const createProjectApi = async (
  payload: CreateProjectInput
): Promise<ApiResponse<Project>> => {
  const { data } = await api.post<ApiResponse<Project>>("/projects", payload);
  return data;
};

export const updateProjectApi = async (
  id: string,
  payload: UpdateProjectInput
): Promise<ApiResponse<Project>> => {
  const { data } = await api.put<ApiResponse<Project>>(`/projects/${id}`, payload);
  return data;
};

export const deleteProjectApi = async (
  id: string
): Promise<ApiResponse<null>> => {
  const { data } = await api.delete<ApiResponse<null>>(`/projects/${id}`);
  return data;
};

