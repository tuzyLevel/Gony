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
exports.isLoggedIn = void 0;
const crypto_1 = __importDefault(require("crypto"));
const session_1 = __importDefault(require("../schemas/session"));
//session 있는지 확인 -> 있으면 그대로 로그인 성공
//                 -> 없으면 로그인
//if do not exists the sid in req.session then redirect to /login
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = new Error();
    if (req.session.sid) {
        const storedSession = yield session_1.default.findOne({
            sessionId: req.session.sid,
        });
        if (!storedSession) {
            error.message = "Need Login";
            return next(error);
        }
        else if (storedSession.expiration < Date.now()) {
            const sid = crypto_1.default.randomUUID();
            session_1.default.updateOne(Object.assign(Object.assign({}, Object(storedSession)), { sessionId: sid }));
            req.session.sid = sid;
        }
        return next();
    }
    else {
        error.message = "Need Login";
        return next(error);
    }
    // const userId = req.body.id;
    // const storedSessionData = await sessionSchema.findOne({ userId: userId });
    // if (!storedSessionData) {
    //   console.log("storedSessionData", storedSessionData);
    //   next();
    // }
});
exports.isLoggedIn = isLoggedIn;
