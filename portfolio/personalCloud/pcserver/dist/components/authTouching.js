"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authTouching = (req, res, next) => {
    console.log(`raw check ${req.session}`);
    if (req.session) {
        req.session.touch();
        console.log(`session touched! ${req.session.userId}`);
    }
    next();
};
exports.default = authTouching;
