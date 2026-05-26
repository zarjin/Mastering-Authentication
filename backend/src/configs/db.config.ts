import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("mongodb connected");
  } catch (error) {
    console.log({ MongoDBError: error });
  }
};
