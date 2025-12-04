import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    claimant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    incidentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "DISBURSED"],
      default: "SUBMITTED"
    },
    evidence: [
      {
        url: String,
        type: String // PHOTO, REPORT
      }
    ],
    adjusterNotes: String
  },
  { timestamps: true }
);

export const Claim = mongoose.model("Claim", claimSchema);
