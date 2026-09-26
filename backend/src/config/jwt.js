import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    ENV.JWT_SECRET,
    { expiresIn: "7d" }
  );
};