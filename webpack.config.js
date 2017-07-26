var path = require("path");
module.exports = {
  entry: {
    app: ["./main.js", "./styles.scss"]
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
      },
      {
        test : /\.scss?/,
        loader : 'style-loader!css-loader!sass-loader'
      },
      {
        test : /\.css?/,
        loader : 'style-loader!css-loader'
      }             
    ]
  }
};