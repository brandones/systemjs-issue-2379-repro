const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");
const { resolve } = require("path");

module.exports = (env, argv = {}) => {
  const outDir = "dist";

  return {
    entry: resolve(__dirname, "src/index.ts"),
    output: {
      filename: "bug.js",
      chunkFilename: "[chunkhash].js",
      path: resolve(__dirname, outDir),
    },
    target: "web",
    devServer: {
      compress: true,
      open: ["/"],
      historyApiFallback: true
    },
    mode: "development",
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: require.resolve("swc-loader"),
            },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: {
                allowTsInNodeModules: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      mainFields: ["module", "main"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      fallback: {
        http: false,
        stream: false,
        https: false,
        zlib: false,
        url: false,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        scriptLoading: "blocking",
        template: resolve(__dirname, "src/index.ejs"),
      }),
    ]
  };
};
