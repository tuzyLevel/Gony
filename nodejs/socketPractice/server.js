"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const socket_1 = __importDefault(require("./socket"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 8005);
app.use((0, morgan_1.default)("dev"));
app.get("/", index_1.default);
const server = app.listen(app.get("port"), () => {
    console.log(`${app.get("port")}번 포트에서 서버 실행됨.`);
});
(0, socket_1.default)(server);
