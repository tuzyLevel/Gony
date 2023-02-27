import React, { useRef } from "react";
import { userRegisterProps } from "../../types/customTypes";

const UserRegister: React.FC<userRegisterProps> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const marriedRef = useRef<HTMLInputElement>(null);
  const userRegisterHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const married = marriedRef.current!.checked;
    //좋지않은 코드, 리액트에서 관리하지 않음
    if (!name) {
      window.alert("이름을 입력하세요");
      nameRef.current?.focus();
    }
    if (!age || parseInt(age) <= 0) {
      window.alert("나이를 입력하세요");
      ageRef.current?.focus();
    }

    const user = { name: name || "", age: parseInt(age || "") || 0, married };
    props.onRegister(user);
  };

  return (
    <div>
      <form id="user-form">
        <fieldset>
          <legend>사용자 등록</legend>
          <div>
            <input
              id="username"
              type="text"
              placeholder="이름"
              ref={nameRef}
              required
            />
          </div>
          <div>
            <input
              id="age"
              type="number"
              placeholder="나이"
              ref={ageRef}
              required
            />
          </div>
          <div>
            <input id="married" type="checkbox" ref={marriedRef} />
            <label htmlFor="married">결혼여부</label>
          </div>
          <button onClick={userRegisterHandler}>등록</button>
        </fieldset>
      </form>
    </div>
  );
};

export default UserRegister;
