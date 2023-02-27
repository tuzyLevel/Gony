"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    registDate: {
        type: Date,
        default: Date.now,
    },
    grade: { type: Number, required: true, default: 1 },
});
exports.default = mongoose_1.default.model("User", userSchema);
