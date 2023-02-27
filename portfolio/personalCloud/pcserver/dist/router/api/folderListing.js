"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const directoryListing_1 = require("../../components/directoryListing");
const router = express_1.default.Router();
router.post("/", (req, res, next) => {
    const loginId = req.session.userId;
    const userRootPath = path_1.default.join(process.env.PWD, `/users/${loginId}`);
    //   const tree = dirTree(userRootFolderPath, {
    //     attributes: ["type", "size", "extension"],
    //   });
    const folderListingMsg = {
        RESPONSE_CODE: "DEFAULT",
        COMMENT: "INITIALIZED MESSAGE",
        data: [],
    };
    console.log(req.session.userId);
    //   getPrivateDirectoryTree(userRootPath);
    (0, directoryListing_1.getPrivateDirectoryTree)(userRootPath, loginId)
        .then((tree) => {
        folderListingMsg.RESPONSE_CODE = "SUCCESS";
        folderListingMsg.COMMENT = "Folder&File List Load SUCCESS";
        folderListingMsg.data = tree;
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
exports.default = router;
