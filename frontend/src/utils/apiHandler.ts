import type { ApiResponse } from "../types/common.types";

export const handleApiResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success || !response.data) {
    throw new Error(response.message || "API Error");
  }

  return response.data;
};