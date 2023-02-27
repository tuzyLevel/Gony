"use strict";
// import express, { Request, Response, NextFunction } from "express";
// import crypto from "crypto";
// import userSchema from "../schema/user";
// import saltSchema from "../schema/salt";
// import { getCurrentDate } from "../components/currentDate";
// declare module "express-session" {
//   interface Session {
//     userId: string;
//   }
// }
// const router = express.Router();
// router.post("/", async (req, res, next) => {
//   const body = req.body;
//   const id = body.id;
//   const password = body.password;
//   const msg: Message.Message = { RESPONSE_CODE: "DEFAULT", COMMENT: "" };
//   try {
//     //DB에서 해당하는 id 검색
//     console.log(id);
//     console.log(body);
//     const data = await userSchema.findOne({
//       id: id,
//     });
//     //해당하는 데이터가 없을 시
//     if (data === null) {
//       msg.RESPONSE_CODE = "NO_USER";
//       msg.COMMENT = "해당 id의 사용자를 찾을 수 없습니다.";
//       return;
//     }
//     //데이터 있을 시
//     const salt = (await saltSchema.findOne({ id: id }))?.get("salt");
//     const userData = await userSchema.findOne({ id: id });
//     const storedPwd = userData?.get("password");
//     const PASSWORD_ITER = parseInt(process.env.PASSWORD_ITER!);
//     const PASSWORD_KEYLEN = parseInt(process.env.PASSWORD_KEYLEN!);
//     const PASSWORD_DIGEST = process.env.PASSWORD_DIGEST!;
//     const hashedPassword = crypto
//       .pbkdf2Sync(
//         password,
//         salt,
//         PASSWORD_ITER,
//         PASSWORD_KEYLEN,
//         PASSWORD_DIGEST
//       )
//       .toString("hex");
//     if (hashedPassword !== storedPwd) {
//       msg.RESPONSE_CODE = "PASSWORD_INCONSISTENCY";
//       msg.COMMENT = "패스워드가 일치하지 않습니다.";
//     } else {
//       msg.RESPONSE_CODE = "LOGIN_SUCCESS";
//       msg.COMMENT = "로그인 성공!";
//       //10분 뒤 만료
//       const expireOffset = 10 * 60 * 1000;
//       const expireTime = Date.now() + expireOffset;
//       // try {
//       //   const _sessionData: any = await sessionSchema.findOne({
//       //     id: id,
//       //   });
//       req.session.userId = id;
//       req.session.save((err) => {
//         if (err) console.error(err);
//         else {
//           console.log(`session saved!`);
//         }
//       });
//       //   if (_sessionData === null) {
//       //     const newSession = await sessionSchema.create({
//       //       id: id,
//       //       expireTime: expireTime,
//       //     });
//       //     console.log(getCurrentDate(newSession.get("expireTime")));
//       //   }
//       // } catch (err) {
//       //   console.error(err);
//       // }
//     }
//   } catch (err) {
//     console.error(err);
//     msg.RESPONSE_CODE = "LOGIN_ERROR";
//     msg.COMMENT = "로그인 처리 중 에러 발생.";
//   } finally {
//     res.send(JSON.stringify(msg));
//   }
// });
// export default router;
