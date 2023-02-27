"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../../schema/user"));
const router = express_1.default.Router();
router.get(`/find/:id`, async (req, res, next) => {
    console.log(req.params.id);
    const targetUserId = req.params.id;
    const msg = {
        RESPONSE_CODE: "FAILED",
        COMMENT: `${targetUserId} 유저 찾기 실패`,
    };
    try {
        const user = await user_1.default.findOne({ id: targetUserId });
        if (user) {
            msg.RESPONSE_CODE = "SUCCESS";
            msg.COMMENT = `${targetUserId} 유저 찾기 성공`;
        }
        else {
            msg.COMMENT = `${targetUserId} 유저 존재하지 않음`;
        }
    }
    catch (err) {
        console.error(err);
    }
    finally {
        res.json(msg);
    }
});
exports.default = router;
