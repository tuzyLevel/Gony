import mongoose from "mongoose";

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  const options = {
    dbName: "nodejs",
    useNewUrlParser: true,
    useCreateIndex: true,
  };

  mongoose.connect(
    "mongodb://park:rhdms91*@localhost:27017/admin",
    options,
    (error) => {
      if (error) {
        console.log("Error occurs, cant connect mongodb");
      } else {
        console.log("Connect success");
      }
    }
  );
};
mongoose.connection.on("error", (error) => {
  console.error("mongodb connection error", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("monggodb was disconnected, Attempt to connect again");
  connect();
});
export default connect;
