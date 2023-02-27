import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  //   const sessionModel = mongoose.model("Session");
  //   const sessionData = sessionModel.find({ _id: req.session.id });
  //   console.log(sessionData);

  console.log("/api/session get request!");
  if (req.session.userId) {
    req.session.touch();
  } else {
  }

  const msg = { userId: req.session.userId, isLogin: true };
  res.json(JSON.stringify(msg));
});

export default router;
