import type { Request, Response } from "express";
import { userModel } from "../models/user.model.ts";
import { hashingPassword } from "../utils/bcrypt.util.ts";

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
