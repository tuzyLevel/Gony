import React from "react";

import { commentItemProps } from "../../types/customTypes";

const CommentItems: React.FC<commentItemProps> = (props) => {
  const commentUpdateHandler = () => {};
  const commentRemoveHandler = () => {};

  return (
    <tr key={props.comment._id}>
      <td>{props.comment._id}</td>
      <td>{props.comment.name}</td>
      <td>{props.comment.comment}</td>
      <td>
        <button onClick={commentUpdateHandler}>수정</button>
      </td>
      <td>
        <button onClick={commentRemoveHandler}>삭제</button>
      </td>
    </tr>
  );
};

export default CommentItems;
