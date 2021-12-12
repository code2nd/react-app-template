const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
    compress: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://www.jalamy.cn:3000",
        pathRewrite: {
          "^/api": "",
        },
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockProtocol: "ws",
      },
    }),
  ],
};
