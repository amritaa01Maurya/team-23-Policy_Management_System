import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "ADJUSTER"],
      default: "CUSTOMER"
    },
    kycDocs: [
      {
        type: {
          type: String,
          enum: ["AADHAR", "PAN", "LICENSE"],
          required: true
        },
        url: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // hash password only when changed
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

export const User = mongoose.model("User", userSchema);
