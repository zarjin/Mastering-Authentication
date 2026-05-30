import JWT from "jsonwebtoken";
import type { IPayload } from "../types/types";

export const generateAccessToken = (payload: IPayload) => {
  return JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (payload: IPayload) => {
  return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return JWT.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
};
