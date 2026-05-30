import { verifyAccessToken } from "../utils/jwt.util.ts";
import type { Request, Response, NextFunction } from "express";
import type { IPayload } from "../types/types";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const token = authHeader.split(" ")[1] as string;

    const decoded = verifyAccessToken(token) as IPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Access token expired",
    });
  }
};
