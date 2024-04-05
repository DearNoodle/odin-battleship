const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
      }),
    ],
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, "src"),
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
  