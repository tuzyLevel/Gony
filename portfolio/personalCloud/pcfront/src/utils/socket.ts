import { io } from "socket.io-client";
import { SERVER_URL } from "../config";

interface CallBackFunctions {
  fileReceiveNoticeHandler: () => void;
}

export function getSocket(
  nameSpace: string | null,
  loginId: string,
  cbs: CallBackFunctions
) {
  const socket = io(
    !nameSpace ? `${SERVER_URL}` : `${SERVER_URL}/${nameSpace}`,
    {
      withCredentials: true,
      transports: ["websocket", "polling"],
    }
  );

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("msg", (msg) => {
    const { type, data } = msg;
    const { from, to, filePath, fileName } = data;
    console.log(msg);

    if (type === "file") {
      if (to === loginId) {
        console.log(
          `${from}으로부터 ${to}에게 ${fileName} 파일이 도착했습니다.`
        );
        cbs.fileReceiveNoticeHandler();
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`${loginId} 접속 종료`);
  });

  return socket;
}
