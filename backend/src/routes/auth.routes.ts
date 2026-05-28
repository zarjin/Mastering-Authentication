import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.ts";
import { isAuthenticated } from "../middleware/isAuthenticated.ts";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", isAuthenticated, logout);
authRoutes.post("/refresh-token", isAuthenticated, refreshToken);
