"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const schemas_1 = __importDefault(require("./schemas"));
const color_hash_1 = __importDefault(require("color-hash"));
const socket_1 = __importDefault(require("./socket"));
const cors_1 = __importDefault(require("cors"));
const registerRouter_1 = __importDefault(require("./routes/registerRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const errorHandlerMiddleware_1 = require("./routes/errorHandlerMiddleware");
const authMiddleware_1 = require("./routes/authMiddleware");
//server port configuration
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 8005);
//cors
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
//dotenv
dotenv_1.default.config({ path: `${__dirname}/.env` });
//mongodb
(0, schemas_1.default)();
//morgan
app.use((0, morgan_1.default)("dev"));
//session
const DEFAULT_PASSWORD = "defaultPassword";
const sessionMiddleware = (0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || DEFAULT_PASSWORD,
    cookie: {
        httpOnly: true,
        secure: false,
    },
});
app.use(sessionMiddleware);
//static folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//json
app.use(express_1.default.json());
//urlencode
app.use(express_1.default.urlencoded({ extended: false }));
//cookie-parser
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
//color-hash
app.use((req, res, next) => {
    if (!req.session.color) {
        const colorHash = new color_hash_1.default();
        req.session.color = colorHash.hex(req.sessionID);
    }
    next();
});
//router
// app.use("/*", authRouter);
// app.use("/*", authRouter);
app.use("/register", authMiddleware_1.isLoggedIn, registerRouter_1.default);
app.use("/login", loginRouter_1.default);
app.use(errorHandlerMiddleware_1.errorHandler);
//server on
const server = app.listen(app.get("port"), () => {
    console.log(`${app.get("port")}번 포트에서 대기중`);
});
(0, socket_1.default)(server, app, sessionMiddleware);
