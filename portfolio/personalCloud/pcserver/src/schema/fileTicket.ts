import mongoose from "mongoose";

const fileTicketSchema = new mongoose.Schema({
  from: { type: String, required: true, ref: "User" },
  to: { type: String, required: true, ref: "User" },
  filePath: { type: String, required: true },
  fileName: { type: String, required: true },
  fileId: { type: String, required: true },
  isRead: { type: Boolean, required: true },
  expireDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 24 * 60 * 60 * 1000,
  },
  madeDate: { type: Date, required: true, default: Date.now() },
});

export default mongoose.model("FileTicket", fileTicketSchema);
