import express from "express";

const router = express.Router();

// api/auth
router.use("/", (req, res, next) => {
  if (req.session.userId) {
    req.session.touch();
  } else {
    console.log("session expired");
  }
  next();
});
