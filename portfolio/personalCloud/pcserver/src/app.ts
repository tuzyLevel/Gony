import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

import MongoStore from "connect-mongo";
import { createServer } from "http";

import { db } from "./db";
import { webSocket } from "./socket";

import authTouching from "./middleware/authTouching";

import apiController from "./router/controller/apiController";

const app = express();

const httpServer = createServer(app);

dotenv.config();
process.env.TZ = "Asia/Seoul";
console.log(new Date(Date.now()).toLocaleTimeString());
app.set("port", process.env.PORT || 8080);
db();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);

const mongoSessionStore = new MongoStore({
  mongoUrl: `mongodb://${process.env.MONGO_URL}/FM`,
  ttl: 30, //30분간 유지
  // autoRemove: "native",
  // autoRemoveInterval: 30,
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }, //30분간 유지
  store: mongoSessionStore,
});

const io = webSocket(httpServer, sessionMiddleware);
app.set("io", io);

app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(authTouching);

app.use("/api", apiController);

// use static build files

app.use("/", express.static("build"));

app.get("/*", (req, res, next) => {
  res.sendFile(`${process.env.PWD}/build/index.html`);
});

app.use("/*", (req, res, next) => {
  console.log("wrong ask");
  res.statusCode = 404;
  res.send("No pages");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
});

httpServer.listen(app.get("port"), () => {
  console.log(`ready on ${app.get("port")} port`);
});

// app.use(
//   sessionRouter,
//   (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.log(`Error Occured! ${err}`);
//   }
// );
