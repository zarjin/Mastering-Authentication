import type { Request, Response } from "express";
import type { IPayload } from "../types/types.ts";
import { userModel } from "../models/user.model.ts";
import { comparePassword, hashingPassword } from "../utils/bcrypt.util.ts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.util.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(409).json({ message: "required all filed " });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).json({ message: "user already existing" });
    }

    const hashPassword = await hashingPassword(password);

    const user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Login unsuccessfully" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;
    if (!email || !password) {
      return res.status(409).json({ message: "required all filed " });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(500).json({ message: "user not found" });
    }
    const isMatch = await comparePassword(password, existingUser.password);

    if (!isMatch) {
      return res.status(500).json({ message: "Password Invited" });
    }

    const payload: IPayload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Login unsuccessfully" });
  }
};
