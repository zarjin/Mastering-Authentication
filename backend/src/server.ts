import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { dbConnect } from "./configs/db.config.ts";
import { authRoutes } from "./routes/auth.routes.ts";

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running PORT:${PORT}`);
});
