import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.NEXT_MONGODB_URL) {
    return console.error("MongoDB URL not found");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URL);
    isConnected = true;
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error);
  }
};
