import express from "express";

const router = express.Router();
router.get("/bye", (req, res) => {
  res.send("<h1>Bye world!</h1>");
});

export default router;
