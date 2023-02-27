import express from "express";
import path from "path";
import fs from "fs";

const app = express();
console.log(__dirname);
app.use("/users", express.static(path.join(__dirname, "../users")));

const id = "park";
if (fs.existsSync(path.join(__dirname, `../users/${id}`))) {
  console.log(`Dir exists`);
} else {
  console.log(`Dir doesn't exist`);
  fs.mkdir(path.join(__dirname, `../users/${id}`), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Dir created successfully!`);
  });
}
app.get("/users/listing", (req, res, next) => {
  fs.readdir(path.join(__dirname, `../users/${id}`), (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    res.send(JSON.stringify(files));
    // files.forEach((file) => {

    // });
  });
});

app.get("/users/listing/download/:filename", async (req, res, next) => {
  const filename = req.params.filename;
  fs.readFile(path.join(__dirname, `../users/${id}/filename`), (err, data) => {
    if (err) return console.error(err);
    // res.sendFile();
  });
});

app.get("/", (req, res, next) => {
  res.send("<h1>Done</h1>");
});

app.listen(8080, () => {
  console.log(`server ready on 8080 port`);
});
