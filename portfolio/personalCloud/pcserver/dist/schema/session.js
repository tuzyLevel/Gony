"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true, ref: "User" },
    generatedTime: {
        type: Date,
        default: Date.now,
    },
    expireTime: {
        type: Date,
        default: () => Date.now() + 60 * 60 * 1000,
    },
});
exports.default = mongoose_1.default.model("Session", sessionSchema);
