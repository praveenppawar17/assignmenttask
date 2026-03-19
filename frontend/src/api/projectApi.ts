import { api } from "./axiosClient";
import type { Project, CreateProjectInput, UpdateProjectInput } from "../types/project.types";
import type { ApiResponse } from "../types/common.types";
import { handleApiResponse } from "../utils/apiHandler";

export const fetchProjectsApi = async (): Promise<Project[]> => {
  const { data } = await api.get<ApiResponse<Project[]>>("/projects");
  return handleApiResponse(data);
};

export const createProjectApi = async (
  payload: CreateProjectInput
): Promise<Project> => {
  const { data } = await api.post<ApiResponse<Project>>("/projects", payload);
  return handleApiResponse(data);
};

export const updateProjectApi = async (
  id: string,
  payload: UpdateProjectInput
): Promise<Project> => {
  const { data } = await api.put<ApiResponse<Project>>(`/projects/${id}`, payload);
  return handleApiResponse(data);
};

export const deleteProjectApi = async (id: string): Promise<null> => {
  const { data } = await api.delete<ApiResponse<null>>(`/projects/${id}`);
  return handleApiResponse(data);
};
