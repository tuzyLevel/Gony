import express, {
  Response,
  Request,
  NextFunction,
  RequestHandler,
} from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import session, { SessionData } from "express-session";
import connect from "./schemas";
import ColorHash from "color-hash";
import webSocket from "./socket";
import cors from "cors";
import registerRouter from "./routes/registerRouter";
import loginRouter from "./routes/loginRouter";
import { errorHandler } from "./routes/errorHandlerMiddleware";
import { isLoggedIn } from "./routes/authMiddleware";

//server port configuration
const app = express();
app.set("port", process.env.PORT || 8005);
//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//dotenv
dotenv.config({ path: `${__dirname}/.env` });

//mongodb
connect();

//morgan
app.use(morgan("dev"));

//session
const DEFAULT_PASSWORD = "defaultPassword";
const sessionMiddleware = session({
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
app.use(express.static(path.join(__dirname, "public")));

//json
app.use(express.json());

//urlencode
app.use(express.urlencoded({ extended: false }));

//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));
declare module "express-session" {
  interface SessionData {
    color: string;
  }
}

//color-hash
app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.session.color) {
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
  }
  next();
});

//router
// app.use("/*", authRouter);
// app.use("/*", authRouter);
app.use("/register", isLoggedIn, registerRouter);
app.use("/login", loginRouter);

app.use(errorHandler);
//server on
const server = app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기중`);
});

webSocket(server, app, sessionMiddleware);
