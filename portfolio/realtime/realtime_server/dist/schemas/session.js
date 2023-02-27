"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
exports.default = mongoose_1.default.model("Session", sessionSchema);
