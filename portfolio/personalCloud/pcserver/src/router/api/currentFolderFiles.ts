import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();
const rootFolder = path.join(process.env.PWD!, `/users`);
// POST `api/currentFolderFiles`
router.post("/", async (req, res, next) => {
  const currentFolderPath = req.body.folder;
  const realCurrentFolderPath = `${rootFolder}/${currentFolderPath}`;
  console.log(realCurrentFolderPath);
  const msg: Message.CurrentFolderFilesMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: "",
    data: [],
  };

  try {
    const list = await fs.readdir(realCurrentFolderPath, {
      withFileTypes: true,
    });
    const fileList = [];
    const folderList = [];

    for (const dirent of list) {
      const direntObject: Message.FileNode = {
        name: dirent.name,
        path: `${currentFolderPath}/${dirent.name}`,
        type: "file",
        volume: 0,
      };
      const volume = (await fs.stat(`${realCurrentFolderPath}/${dirent.name}`))
        .size;
      direntObject.volume = volume;

      if (dirent.isDirectory()) {
        direntObject.type = "directory";
        folderList.push(direntObject);
        continue;
      }

      fileList.push(direntObject);
    }

    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = `${currentFolderPath} 파일 목록 로드 완료!`;
    msg.data = folderList.concat(fileList);
  } catch (err) {
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = `${currentFolderPath} 파일 목록 로드 실패!`;
    msg.data = [];
    console.error(err);
  }
  res.json(msg);
});

export default router;
