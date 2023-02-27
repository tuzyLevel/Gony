import mongoose from "mongoose";

const saltSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, ref: "User" },
  salt: { type: String, required: true, trim: true },
});

export default mongoose.model("Salt", saltSchema);
