import React, { Fragment, useState, useEffect } from "react";

import UserRegister from "../components/User/UserRegister";
import UserLists from "../components/User/UserLists";
import CommentRegister from "../components/Comment/CommentRegister";
import CommentLists from "../components/Comment/CommentLists";
import { commentSchema, userSchema, user } from "../types/customTypes";

const url = "http://localhost:3001";

const Main: React.FC = (props) => {
  //화면에 보여줄 유저리스트 상태
  const [userLists, setUserLists] = useState(Array<userSchema>());
  //화면에 보여줄 선택된 아이디의 코멘트 리스트
  const [commentLists, setCommentLists] = useState(Array<commentSchema>());
  const setUserListsHandler = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setUserLists(data);
    } catch (err) {
      console.error(err);
    }
  };

  const setCommentListsHandler = async (_id: string) => {
    try {
      const response = await fetch(`${url}/users/${_id}/comments`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      setCommentLists(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUserListsHandler();
  }, []);

  const onRegisterHandler = async (userData: user) => {
    try {
      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          age: userData.age,
          married: userData.married,
        }),
      });
      const data = await response.json();
      setUserLists((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const onIdSelectedHandler = async (_id: string) => {
    await setCommentListsHandler(_id);
  };

  return (
    <Fragment>
      <UserRegister onRegister={onRegisterHandler} />
      <br />
      <UserLists userItems={userLists} onIdSelected={onIdSelectedHandler} />
      <br />
      <CommentRegister />
      <br />
      <CommentLists commentItems={commentLists} />
      <script src="https://unpkg.com/axios/dist/axios,min.js"></script>
    </Fragment>
  );
};

export default Main;
