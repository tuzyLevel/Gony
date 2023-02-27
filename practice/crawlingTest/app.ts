import axios from "axios";

axios
  .post(
    "https://www.google.com/recaptcha/api2/reload?k=6LcA2tEZAAAAAJj7FTYTF9cZ4NL3ShgBCBfkWov0",
    {},
    {
      headers: {
        "Content-Type": "application/x-protobuffer",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    }
  )
  .then((res) => {
    console.log(res);
    console.log("=======");
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
