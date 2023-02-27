import express from "express";

import User from "../schemas/user";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users); //여기가 책이랑 다름
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
