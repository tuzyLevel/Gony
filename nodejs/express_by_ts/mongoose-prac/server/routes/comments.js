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
const comments_1 = __importDefault(require("../schemas/comments"));
const router = express_1.default.Router();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comments_1.default.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        const result = yield comments_1.default.populate(comment, { path: "commenter" });
        res.status(201).json(result);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
router
    .route("/:id")
    //   .get(async (req, res, next) => {
    //     try {
    //       const result = await Comment.find({});
    //       res.json(result);
    //     } catch (err) {
    //       console.error(err);
    //       next(err);
    //     }
    //   })
    .patch((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comments_1.default.updateOne({ _id: req.params.id }, {
            comment: req.body.comment,
        });
        res.json(result);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comments_1.default.remove({ _id: req.params.id });
        res.json(result);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
exports.default = router;
