import { api } from "./axiosClient";
import type { DashboardStatsProps } from "../types/dashboard.types";
import type { ApiResponse } from "../types/common.types";

export const fetchDashboardStatsApi = async (): Promise<ApiResponse<DashboardStatsProps>> => {
  const { data } = await api.get<ApiResponse<DashboardStatsProps>>("/dashboard/stats");
  return data;
};
