"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_1 = __importDefault(require("@routers/hello"));
const bye_1 = __importDefault(require("@routers/bye"));
const app = (0, express_1.default)();
app.use(hello_1.default);
app.use(bye_1.default);
app.listen(8080, () => {
    console.log("ready");
});
