import React, { Fragment, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginContext } from "../../context/LoginContext";
import classes from "./LoginModal.module.css";

import { serverURL } from "../../store/MetaData";

interface LoginModalProps extends React.PropsWithChildren {}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const loginCtx = useContext(LoginContext);

  const navigation = useNavigate();
  const registerBtnClickHandler = () => {
    navigation("/register");
  };

  const onLoginHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const userId = idRef.current!.value;
    const password = pwdRef.current!.value;

    axios
      .post(
        `${serverURL}/login`,
        {
          id: userId,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.login.status === "SUCCESSED") {
          // console.log(res.headers["loginSUCCESS"]);
          console.log(res.headers["set-cookie"]);
          console.log(res.data.login);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Fragment>
      <div
        className={classes.modal_background}
        onClick={loginCtx.toggleLoginTriggered}
      ></div>
      <div className={classes.modal_container}>
        <form className={classes.form} onSubmit={onLoginHandler}>
          <div className={classes.form_element}>
            <label htmlFor="id">아이디</label>
            <input type="text" name="id" id="id" ref={idRef} />
          </div>
          <div className={classes.form_element}>
            <label htmlFor="pwd">비밀번호</label>
            <input type="password" name="pwd" id="pwd" ref={pwdRef} />
          </div>
          <div className={` ${classes.form_element} ${classes.form_buttons}`}>
            <button
              type="button"
              id="registerBtn"
              onClick={registerBtnClickHandler}
            >
              회원가입
            </button>
            <button type="submit" id="loginBtn">
              로그인
            </button>
            <button
              type="button"
              id="cancelBtn"
              onClick={loginCtx.toggleLoginTriggered}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginModal;
