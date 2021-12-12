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
        secure: false, // 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器
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
