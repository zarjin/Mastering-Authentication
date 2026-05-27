import { register } from "../controllers/auth.controller.ts";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
