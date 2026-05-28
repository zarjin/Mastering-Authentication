import { verifyToken } from "../utils/jwt.util";
import type { Request, Response, NextFunction } from "express";
import type { IPayload } from "../types/types";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    if (!token) {
      return res.status(500).json({
        message: "token is not found",
      });
    }
    const decoded = verifyToken(token) as IPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "user is not isAuthenticated" });
  }
};
