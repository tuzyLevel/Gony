import express, { Request, Response, NextFunction } from "express";
import path from "path";

import morgan from "morgan";
import cors from "cors";
import connect from "./schemas/index";
import indexRouter from "./routes";
import usersRouter from "./routes/users";
import commentsRouter from "./routes/comments";

const app = express();
app.set("port", process.env.PORT || 3001);
connect();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

interface Error extends globalThis.Error {
  status?: number;
}

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(
    `${req.method} ${req.url}라우터가 없습니다.`
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
  console.log(app.get("port"), "번 포트에서 대기 중");
});
