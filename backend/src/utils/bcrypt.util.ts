import bcrypt from "bcryptjs";

export const hashingPassword = async (password: string) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};
