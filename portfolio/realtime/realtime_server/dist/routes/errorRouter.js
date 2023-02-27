"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const errorHandler = (err, req, res, next) => {
    //   console.log(err);
    console.log("여기까지");
    console.log(err.message);
    if (err === "Need Login") {
        res.redirect("/login");
    }
};
router.use(errorHandler);
exports.default = router;
