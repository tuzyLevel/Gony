import React, { useRef, useState, useReducer } from "react";
import classes from "./RegisterForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IdState {
  isValid: boolean;
  isInserted: boolean;
}
interface Action {
  type: string;
}
const initialIdState: IdState = {
  isValid: false,
  isInserted: false,
};

function reducer(state: IdState, action: Action): IdState {
  switch (action.type) {
    case "IDLE":
      return initialIdState;
    case "INVALID":
      return { isValid: false, isInserted: true };
    case "VALID":
      return { isValid: true, isInserted: true };
    default:
      throw new Error("Unhandled action");
  }
}

const RegisterForm: React.FC = (props) => {
  const navigator = useNavigate();
  const [idState, dispatch] = useReducer(reducer, initialIdState);

  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const valRef = useRef<HTMLInputElement>(null);

  const registerFormSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const inputId = idRef.current!;
    const inputPwd = pwdRef.current!;
    const inputVal = valRef.current!;

    const id = inputId.value;
    const pwd = inputPwd.value;
    const pwdVal = inputVal.value;

    if (!pwdVal) {
      alert("There's no validation value");
      return;
    } else {
      if (pwd !== pwdVal) {
        alert("password Validation failed");
        inputVal.focus();
      }
    }
    if (!inputPwd) {
      pwdRef.current!.focus();
      return;
    }

    axios
      .post("http://localhost:8005/register", {
        userId: id,
        password: pwd,
      })
      .then((res) => {
        if (res.data === "REGIST_DONE") {
          alert("회원가입 성공!");
          navigator("/", { replace: false });
        } else if (res.data === "REGIST_FAILED:ALREADY_EXIST") {
          alert("이미 있는 회원입니다.");
          idRef.current!.focus();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const idInputBlurHandler = (event: React.BaseSyntheticEvent) => {
    if (event.target.id === "id") {
      const inputId = idRef.current!.value;
      if (!inputId) {
        dispatch({ type: "INVALID" });
        idRef.current!.focus();
      } else {
        dispatch({ type: "VALID" });
      }
    } else if (event.target.id === "pwd") {
      console.log("pwd");
    } else if (event.target.id === "valid") {
    }
  };

  const onCancelHandler = (event: React.SyntheticEvent) => {
    idRef.current!.value = "";
    pwdRef.current!.value = "";
    valRef.current!.value = "";
  };

  return (
    <div className={`${classes.register_form_container}`}>
      <form onSubmit={registerFormSubmitHandler}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            ref={idRef}
            onBlur={idInputBlurHandler}
            className={`${
              idState.isInserted && !idState.isValid && classes.invalid_input
            }`}
          />
        </div>
        {idState.isInserted && !idState.isValid && (
          <span>사용할 아이디를 정확하게 입력하세요.</span>
        )}

        <div>
          <label htmlFor="pwd">비밀번호</label>
          <input type="password" id="pwd" name="pwd" ref={pwdRef} min="6" />
        </div>
        <div>
          <label htmlFor="valid">비밀번호 확인</label>
          <input type="password" id="valid" name="valid" ref={valRef} />
        </div>
        <div className={classes.buttons}>
          <button type="submit">회원가입</button>
          <button type="button" onClick={onCancelHandler}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
