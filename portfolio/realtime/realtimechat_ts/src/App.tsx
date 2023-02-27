import Main from "./views/Main";

import Room from "./views/Room";
import Register from "./views/Register";
import "./App.css";

import { Routes, Route } from "react-router-dom";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  news: (data: string) => void;
}

interface ClientToServerEvents {
  reply: (data: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  interval: NodeJS.Timer;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/room" element={<Room />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
