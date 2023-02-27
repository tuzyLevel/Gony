"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../schemas/user"));
const comments_1 = __importDefault(require("../schemas/comments"));
const mongoose_1 = require("mongoose");
const { Types: { ObjectId }, } = mongoose_1.Schema;
const router = express_1.default.Router();
router
    .route("/")
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        res.json(users);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
        });
        console.log(user);
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
router.get("/:id/comments", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comments_1.default.find({
            //   commenter: req.params.id,
            commenter: req.params.id,
        }).populate("commenter");
        console.log(comments);
        res.json(comments);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
exports.default = router;
