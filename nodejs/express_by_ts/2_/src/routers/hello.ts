import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

export default router;
