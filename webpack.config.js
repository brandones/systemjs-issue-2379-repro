const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");
const { resolve } = require("path");
const { name, dependencies } = require("./package.json");
const { ModuleFederationPlugin } = container;

module.exports = (env, argv = {}) => {
  const outDir = "dist";

  return {
    entry: resolve(__dirname, "src/index.ts"),
    output: {
      filename: "bug.js",
      chunkFilename: "[chunkhash].js",
      path: resolve(__dirname, outDir),
      // publicPath: "/bug",
    },
    target: "web",
    devServer: {
      compress: true,
      open: ["bug/test"],
      // devMiddleware: {
      //   publicPath: "bug",
      // },
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
        // publicPath: "bug",
        template: resolve(__dirname, "src/index.ejs"),
        // templateParameters: {
        //   openmrsApiUrl,
        //   openmrsPublicPath,
        //   openmrsFavicon,
        //   openmrsPageTitle,
        //   openmrsImportmapDef,
        //   openmrsImportmapUrl,
        //   openmrsOffline,
        //   openmrsEnvironment,
        //   openmrsConfigUrls,
        //   openmrsCoreImportmap:
        //     appPatterns.length > 0 && JSON.stringify(coreImportmap),
        // },
      }),
      // new ModuleFederationPlugin({
      //   name,
      //   shared: sharedDependencies.reduce((obj, depName) => {
      //     obj[depName] = {
      //       requiredVersion: dependencies[depName] ?? false,
      //       singleton: true,
      //       eager: true,
      //       import: depName,
      //       shareKey: depName,
      //       shareScope: "default",
      //     };
      //     return obj;
      //   }, {}),
      // }),
    ]
  };
};
