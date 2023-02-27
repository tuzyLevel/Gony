"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { Types: { ObjectId }, } = Schema;
const chatSchema = new Schema({
    room: {
        type: ObjectId,
        required: true,
        ref: "Room",
    },
    user: {
        type: String,
        required: true,
    },
    chat: String,
    gif: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Chat", chatSchema);
