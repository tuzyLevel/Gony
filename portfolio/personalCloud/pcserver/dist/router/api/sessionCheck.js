"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    //   const sessionModel = mongoose.model("Session");
    //   const sessionData = sessionModel.find({ _id: req.session.id });
    //   console.log(sessionData);
    console.log("/api/session get request!");
    if (req.session.userId) {
        req.session.touch();
    }
    else {
    }
    const msg = { userId: req.session.userId, isLogin: true };
    res.json(JSON.stringify(msg));
});
exports.default = router;
