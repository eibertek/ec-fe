var path = require("path");
module.exports = {
  entry: {
    app: ["./main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        loader : 'babel-loader'
      }
    ]
  }
};