const path = require("path");
const nodeExternals = require("webpack-node-externals");

const serverTypescriptConfig = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(process.cwd(), "dist"),
  },
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
};

module.exports = serverTypescriptConfig;
