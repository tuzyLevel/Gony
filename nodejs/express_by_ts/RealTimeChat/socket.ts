// import { Server } from "http";
// import WebSocket from "ws";

// export default (server: Server) => {
//   const wss = new WebSocket.Server({ server });

//   interface ws extends WebSocket {
//     interval: NodeJS.Timer;
//   }

//   wss.on("connection", (ws: ws, req) => {
//     //웹 소켓 연결시
//     const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//     console.log("새로운 클라이언트 접속", ip);
//     ws.on("message", (message) => {
//       //클라이언트로부터 메시지 수신 시
//       console.log(message.toString());
//     });
//     ws.on("error", (error) => {
//       //에러 시
//       console.error(error);
//     });
//     ws.on("close", () => {
//       console.log("클라이언트 접속 해제", ip);
//       clearInterval(ws.interval);
//     });

//     ws.interval = setInterval(() => {
//       if (ws.readyState === ws.OPEN) {
//         ws.send("서버->클라이언트 메시지 전송");
//       }
//     }, 3000);
//   });
// };
interface Socket extends SocketIO.Socket {
  interval: NodeJS.Timer;
}

import { Server } from "http";
import SocketIO from "socket.io";

export default (server: Server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket: Socket) => {
    //웹소켓 연결 시
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("New Client connected", ip, socket.id, req.ip);
    socket.on("disconnect", () => {
      //연결 종료 시
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on("error", (error) => {
      //에러 시
      console.error(error);
    });
    socket.on("reply", (data) => {
      //클라이언트로부터 메시지 수신 시
      console.log(data);
    });
    socket.interval = setInterval(() => {
      //3초마다 클라이언트로 메시지 전송
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });
};
