import React from "react";
import { userItemProps } from "../../types/customTypes";

const UserItem: React.FC<userItemProps> = (props) => {
  const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.onIdSelected(event.currentTarget.textContent || "");
  };

  return (
    <tr key={props.user._id}>
      <td>
        <a onClick={onClickHandler}>{props.user._id}</a>
      </td>
      <td>{props.user.name}</td>
      <td>{props.user.age}</td>
      <td>{props.user.married ? "기혼" : "미혼"}</td>
    </tr>
  );
};

export default UserItem;
