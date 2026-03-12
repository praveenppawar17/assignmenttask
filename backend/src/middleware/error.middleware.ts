import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/apiResponse";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Unhandled error:", err);

  return sendResponse(
    res,
    500,
    undefined,
    err.message || "Internal Server Error"
  );
};