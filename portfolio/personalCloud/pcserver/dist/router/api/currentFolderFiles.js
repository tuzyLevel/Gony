"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const rootFolder = path_1.default.join(process.env.PWD, `/users`);
// POST `api/currentFolderFiles`
router.post("/", async (req, res, next) => {
    const currentFolderPath = req.body.folder;
    const realCurrentFolderPath = `${rootFolder}/${currentFolderPath}`;
    console.log(realCurrentFolderPath);
    const msg = {
        RESPONSE_CODE: "DEFAULT",
        COMMENT: "",
        data: [],
    };
    try {
        const list = await promises_1.default.readdir(realCurrentFolderPath, {
            withFileTypes: true,
        });
        const fileList = [];
        const folderList = [];
        for (const dirent of list) {
            const direntObject = {
                name: dirent.name,
                path: `${currentFolderPath}/${dirent.name}`,
                type: "file",
                volume: 0,
            };
            const volume = (await promises_1.default.stat(`${realCurrentFolderPath}/${dirent.name}`))
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
    }
    catch (err) {
        msg.RESPONSE_CODE = "FAILED";
        msg.COMMENT = `${currentFolderPath} 파일 목록 로드 실패!`;
        msg.data = [];
        console.error(err);
    }
    res.json(msg);
});
exports.default = router;
