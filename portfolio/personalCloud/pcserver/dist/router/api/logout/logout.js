"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/logout", (req, res, next) => {
    const msg = {
        RESPONSE_CODE: "LOGOUT_FAILED",
        COMMENT: "로그아웃 실패",
    };
    req.session.destroy((err) => {
        if (err)
            console.error(err);
        else {
            console.log("destroyed session");
            msg.RESPONSE_CODE = "LOGOUT_SUCCESS";
            msg.COMMENT = "LOGOUT SUCESS";
            res.json(msg);
        }
    });
});
exports.default = router;
