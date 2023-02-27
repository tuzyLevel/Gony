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
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(req.session.sid);
    user_1.default
        .find({ userId: body.userId, password: body.password })
        .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
            crypto_1.default.randomBytes(64, (err, buf) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const salt = buf.toString("base64");
                crypto_1.default.pbkdf2(body.password, salt, 256, 64, "sha512", (err, key) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    user_1.default.create({
                        userId: body.userId,
                        password: key.toString("base64"),
                        salt: salt,
                    });
                });
            });
            res.send("REGIST_DONE");
        }
        else {
            res.send("REGIST_FAILED:ALREADY_EXIST");
        }
    })
        .catch((err) => {
        console.error(err);
        console.log("이쪽으로 오는건가?");
    });
    // try {
    //   userSchema
    //     .find({
    //       userId: body.id,
    //       password: body.pwd,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
    // } catch (err) {
    //   console.error(err);
    // }
}));
exports.default = router;
