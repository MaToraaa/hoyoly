import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    token: String,
    genshin: Boolean,
    honkai_star_rail: Boolean,
    honkai_3: Boolean,
    accountName: String
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
