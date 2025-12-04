import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    policyNumber: { type: String, unique: true, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    policyholder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    premium: { type: Number, required: true },
    coverageAmount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "EXPIRED", "REJECTED"],
      default: "PENDING"
    },
    pdfUrl: { type: String },
    qrCodeUrl: { type: String }
  },
  { timestamps: true }
);

export const Policy = mongoose.model("Policy", policySchema);
