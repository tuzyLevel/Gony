import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("/api/session get request!");
  const msg = { userId: req.session.userId, isLogin: false };
  res.json(JSON.stringify(msg));

  if (req.session.userId) {
    req.session.touch();
    msg.isLogin = true;
  }
  res.json(msg);
});

export default router;
