const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-2"]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loader?modules"]
      },
      {
        test: /\.css$/,
        exclude: /src/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".css"]
  }
};
