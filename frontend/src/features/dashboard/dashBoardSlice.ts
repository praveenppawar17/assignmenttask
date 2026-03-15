import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardStatsApi } from "../../api/dashboardApi";
import type { DashboardStatsProps } from "../../types/dashboard.types";

export const fetchDashboardStats = createAsyncThunk<DashboardStatsProps>(
  "dashboard/fetchStats",
  async () => {
    const res = await fetchDashboardStatsApi();

    if (!res.success || !res.data) {
      throw new Error(res.message);
    }

    return res.data;
  }
);