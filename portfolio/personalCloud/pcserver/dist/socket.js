"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocket = void 0;
const socket_io_1 = require("socket.io");
const webSocket = (httpServer, sessionMiddleware) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });
    const notice = io.of("/notice");
    notice.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });
    notice.use((socket, next) => {
        const session = socket.request.session;
        if (session && session.userId) {
            console.log(`${session.userId} session id!!!`);
            next();
        }
        else {
            next(new Error("unauthorized"));
        }
    });
    notice.on("connection", (socket) => {
        console.log(`notice connected!`);
        console.log(socket.request.session);
        notice.on("disconnected", (socket) => {
            console.log("notice disconnected!");
        });
    });
    io.on("connection", (socket) => {
        console.log(`main connected!`);
        io.on("disconnected", (socket) => {
            console.log("main disconnected!");
        });
    });
    return io;
};
exports.webSocket = webSocket;
