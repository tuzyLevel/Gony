"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    max: {
        type: Number,
        required: true,
        default: 10,
        min: 2,
    },
    owner: {
        type: String,
        reqruied: true,
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Room", roomSchema);
