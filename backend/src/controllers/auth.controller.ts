import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { RegisterBody, LoginBody } from "../types/auth.types";
import { sendResponse } from "../utils/apiResponse";

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
  try {
    const user = await registerUser(req.body);
    return sendResponse(res, 201, user, "User registered successfully");
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 400, undefined, error.message);
    }

    return sendResponse(res, 500, undefined, "Something went wrong");
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const user = await loginUser(req.body);
    return sendResponse(res, 200, user, "Login successful");
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 400, undefined, error.message);
    }
    return sendResponse(res, 500, undefined, "Something went wrong");
  }
};
