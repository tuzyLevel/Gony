import { Routes, Route } from "react-router-dom";

import Main from "./page/Main";
import SingleGame from "./page/SingleGame";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/board" element={<SingleGame />} />
    </Routes>
  );
}

export default App;
