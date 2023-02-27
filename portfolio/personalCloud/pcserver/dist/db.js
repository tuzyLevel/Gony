"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function db() {
    function c() {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(`mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}`, 
        //   mongodb://아이디:비밀번호@주소:포트/admin
        //   "mongodb://localhost:27017",
        { dbName: "FM" }, (error) => {
            if (error)
                console.error("mongodb connect error occured!", error);
            console.log("mongodb connected!");
        });
    }
    c();
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("mongodb 연결 끊김 연결 재시도");
        c();
    });
}
exports.db = db;
