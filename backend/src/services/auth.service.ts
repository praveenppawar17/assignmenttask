import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { LoginBody, RegisterBody } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";

export const registerUser = async (registerBody: RegisterBody) => {
  const userExists = await User.findOne({ email: registerBody.email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create(registerBody);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    // token: generateToken(user._id.toString()),
  };
};

export const loginUser = async (loginBody: LoginBody) => {
  const user = await User.findOne({ email: loginBody.email });
  if (!user) {
    throw new ApiError(401,"Invalid credentials");
  }

  const isMatch = await bcrypt.compare(loginBody.password, user.password);
  if (!isMatch) {
    throw new ApiError(401,"Invalid credentials");
  }
  const token = generateToken(user._id.toString());
  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
