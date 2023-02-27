import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import { Session } from "express-session";
import { Server, Namespace, Socket } from "socket.io";
import http from "http";

declare module "http" {
  interface IncomingMessage {
    session: Session & {
      userId: String;
    };
  }
}

export const webSocket = (
  httpServer: http.Server,
  sessionMiddleware: RequestHandler
) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  const notice = io.of("/notice");

  notice.use((socket, next) => {
    sessionMiddleware(
      socket.request as Request,
      {} as Response,
      next as NextFunction
    );
  });

  notice.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.userId) {
      console.log(`${session.userId} session id!!!`);
      next();
    } else {
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
