import express from "express";

import sessionRouter from "./api/sessionCheck";
import folderListingRouter from "./api/folderListing";
import currentFolderFilesRouter from "./api/currentFolderFiles";
import filesRouter from "./api/files/files";
import usersRouter from "./api/users/users";
import noticeRouter from "./api/notice/notice";
import signRouter from "./api/sign/sign";

const router = express.Router();

router.use("/session", sessionRouter);

router.use("/folderListing", folderListingRouter);

router.use("/currentFolderFiles", currentFolderFilesRouter);

router.use("/files", filesRouter);

router.use("/users", usersRouter);

router.use("/notice", noticeRouter);

router.use("/sign", signRouter);

export default router;
