"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fileTicketSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("FileTicket", fileTicketSchema);
