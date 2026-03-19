import { api } from "./axiosClient";
import { handleApiResponse } from "../utils/apiHandler";
import type { LoginInput, RegisterInput, User } from "../types/auth.types";
import type { ApiResponse } from "../types/common.types";

export const loginUserApi = async (payload: LoginInput): Promise<User> => {
  const { data } = await api.post<ApiResponse<User>>("/auth/login", payload);
  return handleApiResponse(data);
};

export const registerUserApi = async (
  payload: RegisterInput
): Promise<User> => {
  const { data } = await api.post<ApiResponse<User>>("/auth/register", payload);
  return handleApiResponse(data);
};
