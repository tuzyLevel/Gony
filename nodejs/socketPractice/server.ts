import express from "express";
import morgan from "morgan";
import webSocket from "./socket";

import indexRouter from "./routes/index";

const app = express();

app.set("port", process.env.PORT || 8005);

app.use(morgan("dev"));

app.get("/", indexRouter);

const server = app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 서버 실행됨.`);
});

webSocket(server);
