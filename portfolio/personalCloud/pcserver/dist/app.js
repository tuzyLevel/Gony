"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const http_1 = require("http");
const db_1 = require("./db");
const socket_1 = require("./socket");
const authTouching_1 = __importDefault(require("./middleware/authTouching"));
const apiController_1 = __importDefault(require("./router/apiController"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
dotenv_1.default.config();
process.env.TZ = "Asia/Seoul";
console.log(new Date(Date.now()).toLocaleTimeString());
app.set("port", process.env.PORT || 8080);
(0, db_1.db)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
}));
const mongoSessionStore = new connect_mongo_1.default({
    mongoUrl: `mongodb://${process.env.MONGO_URL}/FM`,
    ttl: 15,
    // autoRemove: "native",
    autoRemoveInterval: 60,
});
const sessionMiddleware = (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
    store: mongoSessionStore,
});
const io = (0, socket_1.webSocket)(httpServer, sessionMiddleware);
app.set("io", io);
app.use(sessionMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use(authTouching_1.default);
// app.use("/", express.static("build"));
app.use("/api", apiController_1.default);
//use static build files
// app.get("/*", (req, res, next) => {
//   res.sendFile(`${process.env.PWD}/build/index.html`);
// });
// app.use(
//   sessionRouter,
//   (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.log(`Error Occured! ${err}`);
//   }
// );
app.use("/*", (req, res, next) => {
    console.log("wrong ask");
    res.statusCode = 404;
    res.send("No pages");
});
app.use((err, req, res, next) => {
    console.error(err);
});
httpServer.listen(app.get("port"), () => {
    console.log(`ready on ${app.get("port")} port`);
});
