import express from "express";

import sessionRouter from "../api/session/session";
import filesRouter from "../api/files/files";
import usersRouter from "../api/users/users";
import noticeRouter from "../api/notice/notice";
import signRouter from "../api/sign/sign";
import directoriesRouter from "../api/files/directories";

const router = express.Router();

router.use("/session", sessionRouter);

router.use("/files", filesRouter);

router.use("/users", usersRouter);

router.use("/notice", noticeRouter);

router.use("/sign", signRouter);

router.use("/directories", directoriesRouter);

export default router;
