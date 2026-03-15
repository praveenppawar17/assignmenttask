import { api } from "./axiosClient";
import type { LoginInput, RegisterInput, User } from "../types/auth.types";
import type { ApiResponse } from "../types/common.types";

export const registerUserApi = async (
  payload: RegisterInput
): Promise<ApiResponse<User>> => {
  const { data } = await api.post<ApiResponse<User>>("/auth/register", payload);
  return data;
};

export const loginUserApi = async (
  payload: LoginInput
): Promise<ApiResponse<User>> => {
  const { data } = await api.post<ApiResponse<User>>("/auth/login", payload);
  return data;
};
