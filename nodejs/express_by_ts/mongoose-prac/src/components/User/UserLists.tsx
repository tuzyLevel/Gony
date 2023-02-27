import React, { MouseEventHandler, ReactEventHandler } from "react";
import UserItem from "./UserItem";
import { userListsProps } from "../../types/customTypes";

const UserLists: React.FC<userListsProps> = (props) => {
  const showCommentHandler = (event: React.MouseEvent) => {
    // console.log((event.target as HTMLElement).textContent);
    event.preventDefault();
    const _id = event.currentTarget.textContent;
    console.log(_id);
  };

  return (
    <table id="item-list">
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>나이</th>
          <th>결혼유무</th>
        </tr>
      </thead>
      <tbody>
        {props.userItems?.map((user) => (
          <UserItem
            user={user}
            key={user._id}
            onIdSelected={props.onIdSelected}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserLists;
