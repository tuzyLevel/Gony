"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
console.log(__dirname);
app.use("/users", express_1.default.static(path_1.default.join(__dirname, "../users")));
const id = "park";
if (fs_1.default.existsSync(path_1.default.join(__dirname, `../users/${id}`))) {
    console.log(`Dir exists`);
}
else {
    console.log(`Dir doesn't exist`);
    fs_1.default.mkdir(path_1.default.join(__dirname, `../users/${id}`), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`Dir created successfully!`);
    });
}
app.get("/users/listing", (req, res, next) => {
    fs_1.default.readdir(path_1.default.join(__dirname, `../users/${id}`), (err, files) => {
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }
        res.send(JSON.stringify(files));
        // files.forEach((file) => {
        // });
    });
});
app.get("/users/listing/download/:filename", (req, res, next) => {
    const filename = req.params.filename;
    res.sendFile(path_1.default.join(__dirname, `../users/${id}/filename`));
});
app.get("/", (req, res, next) => {
    res.send("<h1>Done</h1>");
});
app.listen(8080, () => {
    console.log(`server ready on 8080 port`);
});
