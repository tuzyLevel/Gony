import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("/api/session get request!");
  const msg = { userId: req.session.userId, isLogin: false };

  if (req.session && req.session.userId) {
    req.session.touch();
    msg.isLogin = true;
  }
  res.json(JSON.stringify(msg));
});

export default router;
