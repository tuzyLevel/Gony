"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err.message === "Need Login") {
        return res.status(500).send("Need Login");
    }
};
exports.errorHandler = errorHandler;
