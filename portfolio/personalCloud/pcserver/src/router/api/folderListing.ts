import express from "express";
import fs from "fs/promises";
import path from "path";
import dirTree from "directory-tree";
import { getPrivateDirectoryTree } from "../../components/directoryListing";

const router = express.Router();

router.post("/", (req, res, next) => {
  const loginId = req.session.userId as string;
  const userRootPath = path.join(process.env.PWD!, `/users/${loginId}`);
  //   const tree = dirTree(userRootFolderPath, {
  //     attributes: ["type", "size", "extension"],
  //   });

  const folderListingMsg: Message.FolderListMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: "INITIALIZED MESSAGE",
    data: [],
  };
  console.log(req.session.userId);
  //   getPrivateDirectoryTree(userRootPath);
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
  //   fs.readdir(userRootPath, { withFileTypes: true })
  //     .then((data) => {
  //       folderListingMsg.RESPONSE_CODE = "SUCCESS";
  //       folderListingMsg.COMMENT = "Folder&File List Load SUCCESS";
  //       folderListingMsg.data = data;
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       folderListingMsg.RESPONSE_CODE = "FAILED";
  //       folderListingMsg.COMMENT = "Folder&File List Load FAILED";

  //       console.error(`${loginId} 폴더 읽기 실패 ${err}`);
  //     })
  //     .finally(() => {
  //       res.json(folderListingMsg);
  //       console.log("FolderListing Msg Sent");
  //     });
});

export default router;
