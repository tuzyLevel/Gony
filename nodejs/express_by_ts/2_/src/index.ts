import express from "express";

import helloRouter from "@routers/hello";
import byeRouter from "@routers/bye";

const app = express();

app.use(helloRouter);
app.use(byeRouter);

app.listen(8080, () => {
  console.log("ready");
});
