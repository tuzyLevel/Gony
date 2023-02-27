"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
exports.default = (server, app, sessionMiddleware //sessionMiddleware type 수정할것
) => {
    const io = new socket_io_1.Server(server, {
        path: "/socket.io",
        cors: {
            origin: "http://localhost:3000",
        },
    });
    app.set("io", io);
    const room = io.of("/room");
    const chat = io.of("/chat");
    const test = io.of("/test");
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request, next);
    });
    room.on("connection", (socket) => {
        console.log("room 네임스페이스에 접속");
        socket.emit("news", `Hello ${socket.id}`);
        socket.on("reply", (message) => {
            console.log(`${message}`);
        });
        socket.on("disconnect", () => {
            console.log("room 네임스페이스 접속 해제");
        });
    });
    chat.on("connection", (socket) => {
        console.log("chat 네임스페이스에 접속");
        const req = socket.request;
        const { headers: { referer }, } = req;
        const roomId = referer === null || referer === void 0 ? void 0 : referer.split("/")[referer.split("/").length - 1].replace(/\?.+/, "");
        console.log(referer === null || referer === void 0 ? void 0 : referer.split("/")); //로그로 체크해볼 부분
        if (roomId) {
            socket.join(roomId);
        }
        else {
            console.log("room 접속 실패");
        }
        socket.on("disconnect", () => {
            console.log("chat 네임스페이스 접속 해제");
            if (roomId) {
                socket.leave(roomId);
            }
        });
    });
    test.on("connection", (socket) => {
        console.log(`${Date.now().toString()} ${socket.id} test 접속`);
        socket.on("msgFromClient", (...arg) => {
            console.log(`${socket.id}로부터 msg : ${arg}`);
            test.emit("broadcasting", `${new Date(Date.now())} ${socket.id}로부터 msg : ${arg}`);
        });
    });
    io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        console.log("새로운 클라이언트 접속!", ip, socket.id); //req.ip 생략
        socket.on("disconnect", () => {
            //연결 해제
            console.log("클라이언트 접속 해제", ip, socket.id);
            clearInterval(socket.data.interval);
        });
        socket.on("error", (error) => {
            //occur errors
            console.error(error);
        });
        socket.on("reply", (data) => {
            //data from client
            console.log(data);
        });
        socket.data.interval = setInterval(() => {
            socket.emit("news", "Hello Socket.IO");
        }, 3000);
    });
};
