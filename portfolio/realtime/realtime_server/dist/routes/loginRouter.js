"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../schemas/user"));
const session_1 = __importDefault(require("../schemas/session"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.session.cookie);
    console.log(req.session.sid);
    if (!res.serverData)
        res.serverData = {};
    const body = yield req.body;
    const id = body.id;
    const inputPwd = body.password;
    const targetData = yield user_1.default.findOne({ userId: id });
    if (targetData) {
        const savedPassword = targetData.password;
        const salt = targetData.salt;
        const key = crypto_1.default.pbkdf2Sync(inputPwd, salt, 256, 64, "sha512");
        //session id configuration
        if (savedPassword === key.toString("base64")) {
            res.serverData.login = { status: "SUCCESSED", msg: "LOGIN_OK" };
            const storedSessionData = yield session_1.default.findOne({ userId: id });
            if (storedSessionData && storedSessionData.expiration < Date.now()) {
                req.session.sid = crypto_1.default.randomBytes(64).toString("base64");
                session_1.default.updateOne({
                    userId: id,
                    sessionId: req.session.sid,
                    expiration: Date.now() + 60000,
                });
            }
        }
        else {
            res.serverData.login = { status: "FAILED", msg: "WRONG_PASSWORD" };
        }
    }
    else {
        res.serverData.login = { status: "FAILED", msg: "NO_USER" };
    }
    return res.send(res.serverData);
});
router.post("/", login);
router.get("/", (req, res, next) => {
    console.log("여기로 못들어오나?");
    res.redirect("/");
});
exports.default = router;
