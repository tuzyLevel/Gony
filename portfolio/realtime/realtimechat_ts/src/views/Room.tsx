import React, { Fragment, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import WrapContainer from "../components/container/WrapContainer";
import Navbar from "../components/Navbar/Navbar";

interface roomSchema {
  title: string;
  owner: string;
  max: Number;
  password: string;
  createdAt: Date;
}

const Room = () => {
  const [roomSocket, setRoomSocket] = useState<Socket>();
  const [roomList, setRoomList] = useState(Array<roomSchema>);
  const [msg, setMsg] = useState(Array<String>);
  const [count, setCount] = useState<Number>(0);
  useEffect(() => {
    const socket = io("http://localhost:8005/test");

    socket.on("connect", () => {
      socket.emit("reply", socket.id);
    });

    socket.on("updateRoomList", (payload: Array<roomSchema>) => {
      setRoomList(payload);
    });

    socket.on("broadcasting", (...arg) => {
      console.log(arg);
      setMsg((prev) => {
        return [...prev, String(arg)];
      });
    });

    //room Socket connected
    setRoomSocket(socket);
    console.log(socket, "test 접속 완료");
  }, []);
  useEffect(() => {
    return () => {
      if (roomSocket) {
        roomSocket.disconnect();
      }
    };
  }, [roomSocket]);

  const msgRef = useRef<HTMLInputElement>(null);

  const msgTransferHandler = (event: React.FormEvent) => {
    event.preventDefault();
    let msg = msgRef.current?.value;
    roomSocket?.emit("msgFromClient", msg);
    msgRef.current!.value = "";
  };
  console.log(msg);
  return (
    <WrapContainer>
      <Navbar />
      <div>
        <form>
          <input type="text" placeholder="하고싶은 말 입력" ref={msgRef} />
          <button type="submit" onClick={msgTransferHandler}>
            전송
          </button>
          <ul>
            {msg.map((m) => (
              <li key={Math.random().toString()}>{m}</li>
            ))}
          </ul>
        </form>
      </div>
    </WrapContainer>
  );
};

export default Room;
