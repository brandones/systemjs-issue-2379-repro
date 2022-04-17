const path = require('path');
const root = process.cwd();
const { name } = require(path.resolve(
  root,
  "package.json"
));

module.exports = {
  entry: {
    [name]: "systemjs-webpack-interop/auto-public-path",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    library: {
      type: 'system',
      name
    }
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: require.resolve("swc-loader"),
        },
      },
    ]
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
  }
};