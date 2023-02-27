import express from "express";
import path from "path";
import { nextTick } from "process";
import { isReadable } from "stream";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(path.join(__dirname, "../views/index"));

  res.sendFile(path.join(__dirname, "../views/index.html"));
});

export default router;
