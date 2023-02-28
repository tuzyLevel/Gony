import express, { Request } from "express";
import multer from "multer";
import fs from "fs/promises";
import uuid from "uuid4";
import path from "path";
import fileTicketSchema from "../../../schema/fileTicket";
import { Server } from "socket.io";

const router = express.Router();
const rootFolder = path.join(process.env.PWD!, `/users`);

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const { currentFolder } = req.body;
    const realFolderPath = `${process.env.PWD!}/users/${currentFolder}`;
    //해당 폴더 없으면 만들어줌
    try {
      fs.readdir(realFolderPath);
    } catch (err) {
      console.error(err);
      return fs.mkdir(realFolderPath);
    }
    // if (!fs.existsSync(realFolderPath)) {
    //   return fs.mkdir(realFolderPath, (error) => cb(error, realFolderPath));
    // }
    cb(null, realFolderPath); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res, next) => {
  const msg: Message.FileMessage = {
    RESPONSE_CODE: "FAILED",
    COMMENT: "파일 업로드 실패!",
  };
  if (req.file) {
    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = `${req.file.originalname} 업로드 성공!`;
  }
  res.json(msg);
});

router.post("/delete", async (req, res, next) => {
  const { path } = req.body;
  const realFilePath = `${process.env.PWD}/users/${path}`;
  const msg: Message.FileMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: `${realFilePath.substring(realFilePath.lastIndexOf("/") + 1)}`,
  };
  try {
    await fs.access(realFilePath);
    await fs.unlink(realFilePath);

    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = msg.COMMENT + "삭제 성공";
  } catch (err) {
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = msg.COMMENT + "삭제 실패";
    console.error(err);
  }
  res.json(msg);
});

router.post("/move", async (req, res, next) => {
  const { filePath, destFolderPath } = req.body;
  const realFilePath = `${process.env.PWD}/users/${filePath}`;
  const realCurrentFileFolderPath = realFilePath.substring(
    0,
    realFilePath.lastIndexOf("/")
  );
  const fileName = realFilePath.substring(realFilePath.lastIndexOf("/") + 1);
  const realDestFolderPath = `${process.env.PWD}/users/${destFolderPath}`;

  const msg: Message.FileMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: `${filePath} -> ${destFolderPath} 이동`,
  };

  try {
    const folder = await fs.readdir(realDestFolderPath);
    const currentFolder = await fs.readdir(realCurrentFileFolderPath);
    if (!currentFolder.includes(fileName)) {
      throw Error("No File");
    }

    // console.log(realFilePath);
    // console.log(realDestFolderPath + "/" + fileName);

    await fs.rename(realFilePath, realDestFolderPath + "/" + fileName);

    // console.log(movedFile);
  } catch (err) {
    console.error(err);
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = msg.COMMENT + " 실패";
  }
});

router.post(`/rename`, async (req, res, next) => {
  // console.log(req.body);
  const { currentFileName, changedFileName } = req.body;
  const msg: Message.FileMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: `${changedFileName}`,
  };

  const currentFolderPath = currentFileName.substring(
    0,
    currentFileName.lastIndexOf("/")
  );

  const currentFileRealPath = `${process.env.PWD}/users/${currentFileName}`;
  const changedFileRealPath = `${process.env.PWD}/users/${currentFolderPath}/${changedFileName}`;
  try {
    await fs.rename(currentFileRealPath, changedFileRealPath);
    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = `${msg.COMMENT}으로 변경 완료`;
  } catch (err) {
    console.error(err);
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = `${msg.COMMENT}으로 변경 실패`;
  } finally {
    res.json(msg);
  }
});

router.post(`/newFolder`, async (req, res, next) => {
  const userId = req.session.userId;
  const { currentFolder } = req.body;

  const folderName = uuid();
  let msg: Message.FileMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: "새로운 폴더 만들기 ",
  };

  try {
    //make folder
    await fs.mkdir(`${process.env.PWD}/users/${currentFolder}/${folderName}`);
    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = msg.COMMENT + "성공";
  } catch (err) {
    console.error(err);
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = msg.COMMENT + "실패";
  } finally {
    return res.json(msg);
  }
});

router.post(`/send`, async (req, res, next) => {
  const io: Server = req.app.get("io");
  const { to, filePath, fileName } = req.body;
  const from = req.session.userId;
  const msg: Message.FileMessage = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: `${to}에게 파일 전송 `,
  };
  io.of("/notice").emit("msg", {
    type: "file",
    data: { from: from, to: to, filePath: filePath, fileName: fileName },
  });
  const fileId = uuid();

  try {
    await fileTicketSchema.insertMany({
      from: from,
      to: to,
      filePath: filePath,
      fileName: fileName,
      fileId: fileId,
      isRead: false,
    });
    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = msg.COMMENT + "성공";
  } catch (err) {
    console.error(err);
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = msg.COMMENT + "실패";
  }
  res.json(msg);
});

router.get(
  `/download`,
  (req, res, next) => {
    if (!req.session || !req.session.userId || !req.query.filePath) {
      res.statusCode = 401;
      res.send("401 UNAUTHORIZED");
    }
    next();
  },
  (req, res, next) => {
    const filePath = req.query.filePath! as string;
    const fileName = filePath.substring(filePath.lastIndexOf("/"));

    res.setHeader("Content-Disposition", `attachment;fileName=${fileName};`);

    res.sendFile(`${process.env.PWD}/users/${filePath}`);
  }
);

// POST `api/files/currentFolder`
router.post("/currentFolder", async (req, res, next) => {
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
