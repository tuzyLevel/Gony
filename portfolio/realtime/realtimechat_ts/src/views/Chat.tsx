import { Fragment } from "react";

const Chat = () => {
  return (
    <Fragment>
      <h1>{"title"}</h1>
      <a href="/" id="exit-btn">
        방 나가기
      </a>
      <fieldset>
        <legend>채팅 내용</legend>
        <div id="chat-list"></div>
      </fieldset>
      <form
        action="/chat"
        id="chat-form"
        method="post"
        encType="multipart/form-data"
      >
        <label htmlFor="gif">GIF 올리기</label>
        <input type="file" id="gif" name="gif" accept="image/gif" />
        <input type="text" id="chat" name="chat" />
        <button type="submit">전송</button>
      </form>
    </Fragment>
  );
};

export default Chat;
