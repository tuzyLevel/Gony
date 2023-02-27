import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Box from "./pages/Box/Box";
import Error from "./pages/Error/Error";
import Test from "./pages/Test/Test";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/box" element={<Box />} />
        <Route path="/test" element={<Test />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
