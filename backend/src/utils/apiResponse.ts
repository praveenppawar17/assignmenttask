import { Response } from "express";
import { ApiResponse } from "../types/api.types";

export const sendResponse = <T>(res: Response,statusCode: number,data?: T,message?: string) => {
  const response: ApiResponse<T> = {
    success: statusCode < 400,
    data,
    message,
  };

  return res.status(statusCode).json(response);
};