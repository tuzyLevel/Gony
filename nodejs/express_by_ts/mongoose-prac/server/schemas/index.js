"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    if (process.env.NODE_ENV !== "production") {
        mongoose_1.default.set("debug", true);
    }
    const connectOptions = {
        dbName: "nodejs",
        // 작동하지 않는 파라미터
        // useNewUrlParser: true,
        // useCreateIndex: true,
    };
    mongoose_1.default.connect("mongodb://park:rhdms91*@localhost:27017/admin", connectOptions, (error) => {
        if (error)
            console.log("몽고디비 연결 에러", error);
        else
            console.log("몽고디비 연결 성공");
    });
};
mongoose_1.default.connection.on("error", (error) => {
    console.error("몽고디비 연결 에러", error);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
});
exports.default = connect;
