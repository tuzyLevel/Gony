"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saltSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true, ref: "User" },
    salt: { type: String, required: true, trim: true },
});
exports.default = mongoose_1.default.model("Salt", saltSchema);
