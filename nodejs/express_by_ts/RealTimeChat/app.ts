import express, { Response, Request, NextFunction } from "express";
import http from "http";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import webSocket from "./socket";
import connect from "./schemas";

dotenv.config();
import indexRouter from "./routes/index";

const app = express();

app.set("port", process.env.PORT || 8005);
const httpServer = http.createServer(app);
connect();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET as string,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", indexRouter);

interface Error extends globalThis.Error {
  status: number;
}
app.use((req, res, next) => {
  const error = new Error(
    `${req.method} ${req.url} 라우터가 없습니다.`
  ) as Error;
  error.status = 404;
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = httpServer.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

webSocket(server);
