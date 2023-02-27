import mongoose from "mongoose";

const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  sessionId: {
    type: String,
    required: true,
  },
  expiration: {
    type: Number,
    default: () => {
      return Date.now() + 1000 * 60 * 10; //default session 10minutes
    },
  },
});

export default mongoose.model("Session", sessionSchema);
