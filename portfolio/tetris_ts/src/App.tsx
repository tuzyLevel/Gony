import Main from "./pages/Main";
import OfflineMode from "./pages/OfflineMode";
import OnlineMode from "./pages/OnlineMode";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/OfflineMode" element={<OfflineMode />} />
      <Route path="/OnlineMode" element={<OnlineMode />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
}

export default App;
