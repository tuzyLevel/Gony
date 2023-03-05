"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../../../schema/user"));
const salt_1 = __importDefault(require("../../../schema/salt"));
const router = express_1.default.Router();
router.post("/in", async (req, res, next) => {
    var _a;
    const body = req.body;
    const id = body.id;
    const password = body.password;
    const msg = { RESPONSE_CODE: "DEFAULT", COMMENT: "" };
    try {
        //DB에서 해당하는 id 검색
        const data = await user_1.default.findOne({
            id: id,
        });
        //해당하는 데이터가 없을 시
        if (data === null)
            throw new Error("NO_USER");
        //데이터 있을 시
        const salt = (_a = (await salt_1.default.findOne({ id: id }))) === null || _a === void 0 ? void 0 : _a.get("salt");
        const userData = await user_1.default.findOne({ id: id });
        const storedPwd = userData === null || userData === void 0 ? void 0 : userData.get("password");
        const PASSWORD_ITER = parseInt(process.env.PASSWORD_ITER);
        const PASSWORD_KEYLEN = parseInt(process.env.PASSWORD_KEYLEN);
        const PASSWORD_DIGEST = process.env.PASSWORD_DIGEST;
        const hashedPassword = crypto_1.default
            .pbkdf2Sync(password, salt, PASSWORD_ITER, PASSWORD_KEYLEN, PASSWORD_DIGEST)
            .toString("hex");
        if (hashedPassword !== storedPwd) {
            msg.RESPONSE_CODE = "PASSWORD_INCONSISTENCY";
            msg.COMMENT = "패스워드가 일치하지 않습니다.";
        }
        else {
            msg.RESPONSE_CODE = "LOGIN_SUCCESS";
            msg.COMMENT = "로그인 성공!";
            //10분 뒤 만료
            const expireOffset = 10 * 60 * 1000;
            const expireTime = Date.now() + expireOffset;
            req.session.userId = id;
            req.session.save((err) => {
                if (err)
                    console.error(err);
                else {
                    console.log(`session saved!`);
                }
            });
        }
    }
    catch (err) {
        if (err.message === "NO_USER") {
            msg.RESPONSE_CODE = "NO_USER";
            msg.COMMENT = "유저를 찾을 수 없음";
        }
        else {
            msg.RESPONSE_CODE = "LOGIN_ERROR";
            msg.COMMENT = "로그인 처리 중 에러 발생.";
        }
    }
    finally {
        res.send(JSON.stringify(msg));
    }
});
router.post("/up", async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    const password = body.password;
    const msg = { RESPONSE_CODE: "DEFAULT", COMMENT: "" };
    await user_1.default
        .findOne({ id: id })
        .then((data) => {
        //DB에 등록된 사용자가 있는 경우
        if (data) {
            msg.RESPONSE_CODE = "USER_EXIST";
            msg.COMMENT = "이미 존재하는 아이디 입니다.";
        }
        else if (!data) {
            //DB에 등록된 사용자가 없는 경우
            crypto_1.default.randomBytes(64, (err, buf) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const salt = buf.toString("hex");
                const PASSWORD_ITER = parseInt(process.env.PASSWORD_ITER);
                const PASSWORD_KEYLEN = parseInt(process.env.PASSWORD_KEYLEN);
                const PASSWORD_DIGEST = process.env.PASSWORD_DIGEST;
                crypto_1.default.pbkdf2(password, salt, PASSWORD_ITER, PASSWORD_KEYLEN, PASSWORD_DIGEST, (err, key) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const hashedPassword = key.toString("hex");
                    user_1.default.insertMany({ id: id, password: hashedPassword });
                    salt_1.default.insertMany({ id: id, salt: salt });
                });
            });
            msg.RESPONSE_CODE = "REGIST_DONE";
            msg.COMMENT = "가입 완료.";
            const userFolderPath = path_1.default.join(process.env.PWD, `users/${id}`);
            return userFolderPath;
        }
    })
        .then((userFolderPath) => {
        console.log(userFolderPath);
        promises_1.default.mkdir(userFolderPath)
            .then((res) => {
            console.log(`${res} ${id} 폴더 생성 완료`);
        })
            .catch((err) => {
            console.error(`user 폴더 생성 에러 발생 ${id} ${err}`);
        });
    })
        .catch((err) => {
        console.error(err);
        msg.RESPONSE_CODE = "REGIST_ERROR";
        msg.COMMENT = "회원가입 도중 에러가 발생하였습니다.";
    })
        .finally(() => {
        console.log(msg);
        res.send(JSON.stringify(msg));
    });
});
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
