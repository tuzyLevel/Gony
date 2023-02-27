import express, { Response, Request, NextFunction } from "express";
import path from "path";

import morgan from "morgan";

import connect from "./schema/index";

const app = express();
const __dirname = path.resolve();

app.set("port", process.env.PORT || 3000);

connect();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface Error {
  status?: number;
  message?: string;
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

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
