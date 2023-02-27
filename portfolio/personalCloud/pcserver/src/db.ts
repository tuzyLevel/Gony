import mongoose from "mongoose";

export function db() {
  function c() {
    mongoose.set("strictQuery", false);

    mongoose.connect(
      `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}`,
      //   mongodb://아이디:비밀번호@주소:포트/admin
      //   "mongodb://localhost:27017",
      { dbName: "FM" },
      (error) => {
        if (error) console.error("mongodb connect error occured!", error);
        console.log("mongodb connected!");
      }
    );
  }
  c();

  mongoose.connection.on("disconnected", () => {
    console.log("mongodb 연결 끊김 연결 재시도");
    c();
  });
}
