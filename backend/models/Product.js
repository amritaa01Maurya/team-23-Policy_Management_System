import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Life Shield, Health Plus, Motor Secure etc
    type: { type: String, enum: ["LIFE", "HEALTH", "VEHICLE"], required: true },
    basePremium: { type: Number, required: true },
    termYears: { type: Number, default: 1 },
    description: { type: String },
    meta: {
      minAge: Number,
      maxAge: Number,
      minIdv: Number,
      maxIdv: Number
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
