import React from "react";

interface loginState {
  isLogin: boolean;
  isLoginTriggered: boolean;
  sessionId: string;
  loginHandler: (sId: string) => void;
  logoutHandler: () => void;
  toggleLoginTriggered: () => void;
}

const initialState: loginState = {
  isLogin: false,
  isLoginTriggered: false,
  sessionId: "",
  loginHandler: () => {},
  logoutHandler: () => {},
  toggleLoginTriggered: () => {},
};

export const LoginContext = React.createContext(initialState);

const LoginContextProvider: React.FC<
  { loginState: loginState } & React.PropsWithChildren
> = (props) => {
  return (
    <LoginContext.Provider value={props.loginState}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
