import React, { useRef } from "react";
import Card from "../../UI/Card";
import classes from "./SignInForm.module.css";
const SignInForm = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordValidRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const onCancelHandler = () => {
    idRef.current!.value = "";
    passwordRef.current!.value = "";
    passwordValidRef.current!.value = "";
  };
  return (
    <div className={classes["form-container"]}>
      <Card className={""}>
        <form onSubmit={submitHandler} className={classes["sign-in-form"]}>
          <div>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" ref={idRef} />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" ref={passwordRef} />
          </div>
          <div>
            <label htmlFor="passwordValid">VALID</label>
            <input type="password" id="passwordValid" ref={passwordValidRef} />
          </div>
          <div className={classes["sign-in-form-button"]}>
            <button
              type="submit"
              className={classes["sign-in-form-button-sign-in"]}
            >
              가입
            </button>
            <button
              type="button"
              className={classes["sign-in-form-button-cancel"]}
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
export default SignInForm;
