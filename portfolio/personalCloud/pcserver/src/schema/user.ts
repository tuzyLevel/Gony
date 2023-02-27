import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  registDate: {
    type: Date,
    default: Date.now,
  },
  grade: { type: Number, required: true, default: 1 },
});

export default mongoose.model("User", userSchema);
