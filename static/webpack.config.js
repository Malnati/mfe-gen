const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "platform",
    projectName: "account",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@imgs": path.resolve(__dirname, "src/assets/imgs"),
        "@documents": path.resolve(__dirname, "src/assets/documents"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
    plugins: [
      new NodePolyfillPlugin({
        additionalAliases: ["process", "punycode"],
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed),
      }),
    ],
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "react-router-dom": "react-router-dom",
    },
  });
};
