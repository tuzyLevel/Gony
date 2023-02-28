import express from "express";
import path from "path";
import { getPrivateDirectoryTree } from "../../../components/directoryListing";

const router = express.Router();

router.post("/directories", (req, res, next) => {
  const loginId = req.session.userId as string;
  const userRootPath = path.join(process.env.PWD!, `/users/${loginId}`);

  const folderListingMsg: Message.FolderListMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: "INITIALIZED MESSAGE",
    data: [],
  };
  console.log(req.session.userId);
  getPrivateDirectoryTree(userRootPath, loginId)
    .then((tree) => {
      folderListingMsg.RESPONSE_CODE = "SUCCESS";
      folderListingMsg.COMMENT = "Folder&File List Load SUCCESS";
      folderListingMsg.data = tree as Message.DirectoryNode[];
    })
    .catch((err) => {
      folderListingMsg.RESPONSE_CODE = "FAILED";
      folderListingMsg.COMMENT = "Folder&File List Load FAILED";
      console.error(err);
    })
    .finally(() => {
      res.json(folderListingMsg);
    });
});

export default router;
