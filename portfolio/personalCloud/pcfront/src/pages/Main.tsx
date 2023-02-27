import React, { Fragment, SyntheticEvent, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

import axios from "axios";

import { SERVER_URL } from "../config";

import Button from "../components/Button/Button";
import Modal from "../components/Modal/Main/Modal";
import ModalPortal from "../components/Portal/ModalPortal";

import classes from "./Main.module.css";
import { login } from "../store/features/loginSlice";
import {
  loginModalOpen,
  registModalOpen,
} from "../store/features/mainModalSlice";
import { useNavigate } from "react-router-dom";

import { sessionCheck } from "../utils/sessionCheck";

const Main = (props: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //login status
  const loginId = useSelector((state: RootState) => state.loginChecker.userId);

  //modal status
  const modalState = useSelector(
    (state: RootState) => state.mainModalOpenChecker.modalState
  );

  useEffect(() => {
    // if (loginId === "logout") {
    sessionCheck().then((res) => {
      const data = res.data;
      let { userId } = JSON.parse(data);
      if (!userId) {
        userId = "logout";
        dispatch(login(userId));
        navigate("/", { replace: true });
      } else {
        dispatch(login(userId));
        navigate("/box", { replace: true });
      }
    });
    // }
  }, [dispatch, navigate, loginId]);

  const registBtnClickHandler = () => {
    dispatch(registModalOpen());
  };

  const loginBtnClickHandler = () => {
    dispatch(loginModalOpen());
  };

  return (
    <Fragment>
      {/* main */}
      <div className={classes.main_page_container}>
        <Button
          className="bg main_regist_btn"
          buttonName={"회원가입"}
          onClick={registBtnClickHandler}
        ></Button>
        <Button
          className="bg main_login_btn"
          buttonName={"로그인"}
          onClick={loginBtnClickHandler}
        ></Button>
      </div>

      {/* modal */}
      <ModalPortal>{modalState.isOpen && <Modal />}</ModalPortal>
    </Fragment>
  );
};

export default Main;
