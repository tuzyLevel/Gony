import path from "path";

module.exports = {
  entry: "./src/index.js",

  resolve: {
    alias: {
      "@routers": path.resolve(__dirname, "src/routers"),
    },
  },
};
