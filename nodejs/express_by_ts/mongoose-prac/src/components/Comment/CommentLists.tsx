import CommentItem from "./CommentItem";
import { commentListsProps } from "../../types/customTypes";

const CommentLists: React.FC<commentListsProps> = (props) => {
  return (
    <table id="comment-list">
      <thead>
        <tr>
          <th>아이디</th>
          <th>작성자</th>
          <th>댓글</th>
          <th>수정</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {props.commentItems?.map((comment) => (
          <CommentItem comment={comment} key={comment._id + Date.now()} />
        ))}
      </tbody>
    </table>
  );
};

export default CommentLists;
