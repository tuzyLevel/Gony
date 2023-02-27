import express from "express";

import userSchema from "../../../schema/user";

const router = express.Router();

router.get(`/find/:id`, async (req, res, next) => {
  console.log(req.params.id);
  const targetUserId = req.params.id;
  const msg: Message.UserMessage = {
    RESPONSE_CODE: "FAILED",
    COMMENT: `${targetUserId} 유저 찾기 실패`,
  };
  try {
    const user = await userSchema.findOne({ id: targetUserId });
    if (user) {
      msg.RESPONSE_CODE = "SUCCESS";
      msg.COMMENT = `${targetUserId} 유저 찾기 성공`;
    } else {
      msg.COMMENT = `${targetUserId} 유저 존재하지 않음`;
    }
  } catch (err) {
    console.error(err);
  } finally {
    res.json(msg);
  }
});

export default router;
