"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    console.log("/api/session get request!");
    const msg = { userId: req.session.userId, isLogin: false };
    if (req.session && req.session.userId) {
        req.session.touch();
        msg.isLogin = true;
    }
    res.json(JSON.stringify(msg));
});
exports.default = router;
