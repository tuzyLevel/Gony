import React, { SyntheticEvent, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../../store/features/loginSlice";
import { modalClose } from "../../../../store/features/mainModalSlice";

import Button from "../../../Button/Button";
import Card from "../../../Card/Card";

import classes from "../Modal.module.css";

import { SERVER_URL } from "../../../../config";
import { RootState } from "../../../../store/store";

interface ModalFormProps extends React.PropsWithChildren {}

const loginModalInfo: ModalInfo = {
  modalName: "login",
  contents: ["id", "password"],
  ko: { modalName: "로그인", id: "아이디", password: "비밀번호" },
};

const registModalInfo: ModalInfo = {
  modalName: "regist",
  contents: ["id", "password", "password_val"],
  ko: {
    modalName: "회원가입",
    id: "아이디",
    password: "비밀번호",
    password_val: "비밀번호 확인",
  },
};

const validation = (inputId: string, data: string, data2?: string) => {
  if (inputId === "id") {
    const pattern = /(?=.*\w)(?!.*\W).{6,15}/;
    return !!data.match(pattern);
  }

  if (inputId === "password") {
    //영숫자, 특수문자 허용 공백문자 미허용
    const pattern = /(?=.*\d)(?=.*\w)(?!.*\s).{8,15}/;
    return !!data.match(pattern);
  }

  if (inputId === "password_val") {
    return data === data2;
  }
};

const ModalForm = (props: ModalFormProps) => {
  const modalState = useSelector(
    (state: RootState) => state.mainModalOpenChecker.modalState
  );

  const url =
    modalState.name === "login"
      ? `${SERVER_URL}/api/sign/in`
      : `${SERVER_URL}/api/sign/up`;
  const refs = useRef<{ [id: string]: HTMLInputElement }>({});

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const modalCloseHandler = () => {
    dispatch(modalClose());
  };

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget;
    let id: string = "";
    let password: string = "";

    for (let i = 0; i < form.children.length; i++) {
      const inputEl = form.children[i].querySelector(
        "div > input"
      ) as HTMLInputElement;
      if (!inputEl) continue;
      if (inputEl.id === "id" && validation(inputEl.id, inputEl.value)) {
        id = inputEl.value;
        continue;
      }
      if (id === "") {
        alert("올바른 아이디를 입력하세요");
        return;
      }
      if (inputEl.id === "password" && validation(inputEl.id, inputEl.value)) {
        password = inputEl.value;
        continue;
      }
      if (password === "") {
        alert("올바른 패스워드를 입력하세요.");
        return;
      }
      if (
        inputEl.id === "password_val" &&
        !validation(inputEl.id, password, inputEl.value)
      ) {
        alert("패스워드와 확인값이 다릅니다.");
        return;
      }
    }

    await axios
      .post(url, { id: id, password: password }, { withCredentials: true })
      .then((res) => {
        const { RESPONSE_CODE, COMMENT } = res.data;

        //로그인(login)
        if (RESPONSE_CODE === "NO_USER") {
          //아이디가 없음
          alert("아이디가 존재하지 않습니다.");
          return;
        } else if (RESPONSE_CODE === "LOGIN_SUCCESS") {
          //로그인 성공
          dispatch(login(id));
          dispatch(modalClose());

          navigation("/box", { replace: false });
        } else if (RESPONSE_CODE === "PASSWORD_INCONSISTENCY") {
          alert(COMMENT);
        }
        //회원가입(regist)
        else if (RESPONSE_CODE === "USER_EXIST") {
          alert(COMMENT);
        } else if (RESPONSE_CODE === "REGIST_DONE") {
          alert(COMMENT);
          dispatch(modalClose());
        } else if (RESPONSE_CODE === "LOGIN_ERROR") {
          alert(COMMENT);
          return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card
      style={{
        width: "600px",
        height: "400px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "beige",
        zIndex: "10",
        border: "2px solid black",
        boxShadow: "0px 0px 10px 10px",
      }}
    >
      {modalState.name === "login" && (
        <form
          id={`${modalState.name}_modal_form`}
          className={classes["modal_form"]}
          onSubmit={submitHandler}
        >
          {loginModalInfo.contents.map((content) => (
            <div
              className={classes[`modal_content`]}
              id={`${loginModalInfo.modalName}_content_${content}`}
              key={`${loginModalInfo.modalName}_content_${content}`}
            >
              <label htmlFor={content}>{loginModalInfo.ko[content]}</label>
              <input
                className={classes.modal_input}
                name={content}
                id={content}
                type={
                  content.substring(0, 8) === "password" ? "password" : "text"
                }
                ref={(el) => (refs.current[content] = el!)}
              ></input>
            </div>
          ))}

          <div>
            <Button
              buttonName={`${loginModalInfo.modalName}`}
              className={`md ${loginModalInfo.modalName} mg-sm btn_login`}
              type="submit"
              form="login_modal_form"
            />
            <Button
              buttonName="Cancel"
              className={`md btn_cancel mg-sm`}
              onClick={modalCloseHandler}
            ></Button>
          </div>
        </form>
      )}

      {modalState.name === "regist" && (
        <form
          id={`${modalState.name}_modal_form`}
          className={classes["modal_form"]}
          onSubmit={submitHandler}
        >
          {registModalInfo.contents.map((content) => (
            <div
              className={classes[`modal_content`]}
              id={`${registModalInfo.modalName}_content_${content}`}
              key={`${registModalInfo.modalName}_content_${content}`}
            >
              <label htmlFor={content}>{registModalInfo.ko[content]}</label>
              <input
                className={classes.modal_input}
                name={content}
                id={content}
                type={
                  content.substring(0, 8) === "password" ? "password" : "text"
                }
                // onBlur={onBlurHandler}
                ref={(el) => (refs.current[content] = el!)}
              ></input>
            </div>
          ))}

          <div>
            <Button
              buttonName={`${registModalInfo.modalName}`}
              className={`md ${registModalInfo.modalName} mg-sm btn_signin`}
              type="submit"
              form={`${modalState.name}_modal_form`}
            />
            <Button
              buttonName="Cancel"
              className={`md btn_cancel mg-sm`}
              onClick={modalCloseHandler}
            />
          </div>
        </form>
      )}
    </Card>
  );
};

export default ModalForm;
