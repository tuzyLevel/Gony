"use strict";
// import express, { Request, Response, NextFunction } from "express";
// import crypto from "crypto";
// import fs from "fs/promises";
// import path from "path";
// import userSchema from "../schema/user";
// import saltSchema from "../schema/salt";
// import { getCurrentDate } from "../components/currentDate";
// const router = express.Router();
// router.post("/", async (req, res, next) => {
//   const body = req.body;
//   const id = body.id;
//   const password = body.password;
//   const msg: Message.Message = { RESPONSE_CODE: "DEFAULT", COMMENT: "" };
//   await userSchema
//     .findOne({ id: id })
//     .then((data) => {
//       //DB에 등록된 사용자가 있는 경우
//       if (data) {
//         msg.RESPONSE_CODE = "USER_EXIST";
//         msg.COMMENT = "이미 존재하는 아이디 입니다.";
//       } else if (!data) {
//         //DB에 등록된 사용자가 없는 경우
//         crypto.randomBytes(64, (err, buf) => {
//           if (err) {
//             console.log(err);
//             return;
//           }
//           const salt = buf.toString("hex");
//           const PASSWORD_ITER = parseInt(process.env.PASSWORD_ITER!);
//           const PASSWORD_KEYLEN = parseInt(process.env.PASSWORD_KEYLEN!);
//           const PASSWORD_DIGEST = process.env.PASSWORD_DIGEST!;
//           crypto.pbkdf2(
//             password,
//             salt,
//             PASSWORD_ITER,
//             PASSWORD_KEYLEN,
//             PASSWORD_DIGEST,
//             (err, key) => {
//               if (err) {
//                 console.log(err);
//                 return;
//               }
//               const hashedPassword = key.toString("hex");
//               userSchema.insertMany({ id: id, password: hashedPassword });
//               saltSchema.insertMany({ id: id, salt: salt });
//             }
//           );
//         });
//         msg.RESPONSE_CODE = "REGIST_DONE";
//         msg.COMMENT = "가입 완료.";
//         const userFolderPath = path.join(process.env.PWD!, `users/${id}`);
//         return userFolderPath;
//       }
//     })
//     .then((userFolderPath) => {
//       console.log(userFolderPath);
//       fs.mkdir(userFolderPath!)
//         .then((res) => {
//           console.log(`${res} ${id} 폴더 생성 완료`);
//         })
//         .catch((err) => {
//           console.error(`user 폴더 생성 에러 발생 ${id} ${err}`);
//         });
//     })
//     .catch((err) => {
//       console.error(err);
//       msg.RESPONSE_CODE = "REGIST_ERROR";
//       msg.COMMENT = "회원가입 도중 에러가 발생하였습니다.";
//     })
//     .finally(() => {
//       console.log(msg);
//       res.send(JSON.stringify(msg));
//     });
// });
// router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err) {
//     console.log(err);
//   }
// });
// export default router;
