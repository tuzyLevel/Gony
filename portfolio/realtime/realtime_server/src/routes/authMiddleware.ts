import express, { RequestHandler } from "express";
import session from "express-session";
import crypto from "crypto";

import sessionSchema from "../schemas/session";

//extends express-session module's SessionData interface
declare module "express-session" {
  interface SessionData {
    sid: string;
    userId: string;
  }
}

//session 있는지 확인 -> 있으면 그대로 로그인 성공
//                 -> 없으면 로그인

//if do not exists the sid in req.session then redirect to /login
export const isLoggedIn: RequestHandler = async (req, res, next) => {
  const error = new Error();
  if (req.session.sid) {
    const storedSession = await sessionSchema.findOne({
      sessionId: req.session.sid,
    });
    if (!storedSession) {
      error.message = "Need Login";
      return next(error);
    } else if (storedSession.expiration < Date.now()) {
      const sid = crypto.randomUUID();
      sessionSchema.updateOne({ ...Object(storedSession), sessionId: sid });
      req.session.sid = sid;
    }
    return next();
  } else {
    error.message = "Need Login";
    return next(error);
  }
  // const userId = req.body.id;

  // const storedSessionData = await sessionSchema.findOne({ userId: userId });

  // if (!storedSessionData) {
  //   console.log("storedSessionData", storedSessionData);
  //   next();
  // }
};
