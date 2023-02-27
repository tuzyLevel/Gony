"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// api/auth
router.use("/", (req, res, next) => {
    if (req.session.userId) {
        req.session.touch();
    }
    else {
        console.log("session expired");
    }
    next();
});
