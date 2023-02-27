import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import cookieParser from "cookie-parser";
import session from "express-session";
import userSchema from "../schemas/user";
import sessionSchema from "../schemas/session";
import crypto from "crypto";

const router = express.Router();

interface CustomResponse extends Response {
  serverData?: { login?: { status: string; msg: string } };
}

const login: RequestHandler = async (req, res: CustomResponse, next) => {
  // console.log(req.session.cookie);
  console.log(req.session.sid);
  if (!res.serverData) res.serverData = {};
  const body = await req.body;

  const id = body.id;
  const inputPwd = body.password;
  const targetData = await userSchema.findOne({ userId: id });
  if (targetData) {
    const savedPassword = targetData.password;
    const salt = targetData.salt;
    const key = crypto.pbkdf2Sync(inputPwd, salt, 256, 64, "sha512");
    //session id configuration

    if (savedPassword === key.toString("base64")) {
      res.serverData!.login = { status: "SUCCESSED", msg: "LOGIN_OK" };
      const storedSessionData = await sessionSchema.findOne({ userId: id });
      if (storedSessionData && storedSessionData!.expiration < Date.now()) {
        req.session.sid = crypto.randomBytes(64).toString("base64");
        sessionSchema.updateOne({
          userId: id,
          sessionId: req.session.sid,
          expiration: Date.now() + 60000,
        });
      }
    } else {
      res.serverData!.login = { status: "FAILED", msg: "WRONG_PASSWORD" };
    }
  } else {
    res.serverData.login = { status: "FAILED", msg: "NO_USER" };
  }

  return res.send(res.serverData);
};

router.post("/", login);
router.get("/", (req, res, next) => {
  console.log("여기로 못들어오나?");
  res.redirect("/");
});

export default router;
