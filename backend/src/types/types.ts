import type mongoose from "mongoose";

export interface IPayload {
  id: mongoose.Types.ObjectId;
  email: string;
}

export interface IUser {
  fullname: string;
  email: string;
  password: string;
}

