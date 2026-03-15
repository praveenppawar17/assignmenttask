import { Request, Response } from "express";
import { getDashboardStatsService } from "../services/dashboard.service";
import { sendResponse } from "../utils/apiResponse";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStatsService(req.user!.id);

    return sendResponse(
      res,
      200,
      stats,
      "Dashboard stats fetched successfully"
    );
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 500, undefined, error.message);
    }
  }
};