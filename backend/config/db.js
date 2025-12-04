import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // connect mongodb
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("db connection error", err.message);
    process.exit(1);
  }
};
