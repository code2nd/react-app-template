const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    // 对代码压缩
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
          },
          mangle: true,
          toplevel: true,
          keep_classnames: true, // 保留class名
          keep_fnames: false, // 保留函数名
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[id].[contenthash:8].css",
      chunkFilename: "static/css/[id].[contenthash:8].chunk.css",
    }),
  ],
};
