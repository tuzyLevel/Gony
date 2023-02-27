import express, { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import userSchema from "../schemas/user";
import crypto from "crypto";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  console.log(req.session.sid);

  userSchema
    .find({ userId: body.userId, password: body.password })
    .then((data) => {
      console.log(data.length);
      if (data.length === 0) {
        crypto.randomBytes(64, (err, buf) => {
          if (err) {
            console.error(err);
            return;
          }
          const salt = buf.toString("base64");
          crypto.pbkdf2(body.password, salt, 256, 64, "sha512", (err, key) => {
            if (err) {
              console.error(err);
              return;
            }
            userSchema.create({
              userId: body.userId,
              password: key.toString("base64"),
              salt: salt,
            });
          });
        });
        res.send("REGIST_DONE");
      } else {
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
});

export default router;
