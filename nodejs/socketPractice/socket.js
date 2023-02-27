"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
exports.default = (server) => {
    const io = new socket_io_1.Server(server, {
        path: "/socket.io",
    });
    const room = io.of("/room");
    const chat = io.of("/chat");
    room.on("connection", (socket) => {
        console.log(`Welcome ${socket.id} You enter the room namespaces`);
        socket.on("boom", () => {
            console.log("event boom occurs");
        });
        socket.on("disconnected", () => {
            console.log(`${socket.id} disconnected`);
        });
    });
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnected", () => {
            console.log("user disconnected");
        });
    });
};
