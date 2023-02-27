const CommentRegister = () => {
  return (
    <div>
      <form id="comment-form">
        <fieldset>
          <legend>댓글 등록</legend>
          <div>
            <input type="text" id="userid" placeholder="사용자 아이디" />
          </div>
          <div>
            <input type="text" id="comment" placeholder="댓글" />
          </div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CommentRegister;
