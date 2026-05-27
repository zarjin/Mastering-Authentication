import type { IUser } from "../types/types.ts";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>({
  fullname: {
    type: String,
    minLength: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
});

export const userModel = mongoose.model<IUser>("User", userSchema);
