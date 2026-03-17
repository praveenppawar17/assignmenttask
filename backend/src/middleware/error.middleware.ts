import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { sendResponse } from "../utils/apiResponse";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors = null;
  // Custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || null;
  }

  // Zod validation error
  else if (err instanceof ZodError) {
    statusCode = 400;
    errors = err.issues.map((e) => ({ 
      field: e.path.join("."),
      message: e.message,
    }));
    message = "Validation error";
  }

  // Mongo duplicate key
  else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Invalid ObjectId
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  console.error(err);

  return sendResponse(res, statusCode, errors, message);
};