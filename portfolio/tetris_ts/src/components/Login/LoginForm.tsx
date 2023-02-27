import React, { useRef } from "react";

import Card from "../../UI/Card";

import classes from "./LoginForm.module.css";
const LoginForm = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submit Button Clicked");
    const id = idRef.current!.value;
    const password = passwordRef.current!.value;
    console.log(id, password);
  };
  const onCancelHandler = () => {
    console.log("Cancel button Clicked!");
    idRef.current!.value = "";
    passwordRef.current!.value = "";
  };

  return (
    <div className={classes["form-container"]}>
      <Card className={""}>
        <form onSubmit={submitHandler} className={classes["login-form"]}>
          <div>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" ref={idRef} />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" ref={passwordRef} />
          </div>
          <div className={classes["login-form-button"]}>
            <button
              type="submit"
              className={classes["login-form-button-login"]}
            >
              로그인
            </button>
            <button
              type="button"
              className={classes["login-form-button-cancel"]}
              onClick={onCancelHandler}
            >
              취소
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
