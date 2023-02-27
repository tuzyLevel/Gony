import React, { useState } from "react";

import WrapContainer from "../components/container/WrapContainer";
import Navbar from "../components/Navbar/Navbar";
import ModalPortal from "../components/Modal/ModalPortal";
import LoginModal from "../components/Modal/LoginModal";
import LoginContextProvider from "../context/LoginContext";

const Main: React.FC = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginTriggered, setIsLoginTriggered] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const loginHandler = (sId: string) => {
    setIsLogin(true);
    setSessionId(sId);
  };
  const logoutHandler = () => {
    setIsLogin(false);
    setSessionId("");
  };
  const toggleLoginTriggered = () => {
    setIsLoginTriggered((prev) => !prev);
  };

  return (
    <LoginContextProvider
      loginState={{
        isLogin,
        isLoginTriggered,
        sessionId,
        loginHandler,
        logoutHandler,
        toggleLoginTriggered,
      }}
    >
      <WrapContainer>
        {!isLogin && isLoginTriggered && (
          <ModalPortal>
            <LoginModal />
          </ModalPortal>
        )}
        <Navbar />
      </WrapContainer>
    </LoginContextProvider>
  );
};

export default Main;
