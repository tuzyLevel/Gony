import mongoose from "mongoose";

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  const connectOptions = {
    dbName: "nodejs",
    // 작동하지 않는 파라미터
    // useNewUrlParser: true,
    // useCreateIndex: true,
  };

  mongoose.connect(
    "mongodb://park:rhdms91*@localhost:27017/admin",
    connectOptions,
    (error) => {
      if (error) console.log("몽고디비 연결 에러", error);
      else console.log("몽고디비 연결 성공");
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
  connect();
});

export default connect;
