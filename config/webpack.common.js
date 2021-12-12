const { resolveApp } = require("./paths");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

const { merge } = require("webpack-merge");

const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

const commonConfig = (isProduction) => {
  const styleLoader = isProduction
    ? MiniCssExtractPlugin.loader
    : "style-loader";

  return {
    entry: "./src/index.js",
    output: {
      path: resolveApp("./build"),
      filename: "static/js/[name].[chunkhash:8].bundle.js",
      chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
      alias: {
        "@": resolveApp("./src"),
        pages: resolveApp("./src/pages"),
        components: resolveApp("./src/components"),
      },
    },
    optimization: {
      chunkIds: "deterministic",
      // tree shaking
      usedExports: true,
      // 代码分割
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            filename: "static/js/[id].[contenthash:8].venders.js",
            chunks: "all",
          },
        },
      },
      // true/multiple single
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [styleLoader, "css-loader", "postcss-loader"],
          sideEffects: true,
        },
        {
          test: /\.less$/,
          use: [styleLoader, "css-loader", "postcss-loader", "less-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: "asset",
          generator: {
            filename: "static/img/[name].[contenthash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024,
            },
          },
        },
        {
          test: /\.(ttf|eot|woff2?)$/i,
          type: "asset/resource",
          generator: {
            filename: "static/font/[name].[contenthash:8][ext]",
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "React-Demo",
        template: "./public/index.html",
      }),
      new DefinePlugin({
        PUBLIC_URL: '"./"',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    ],
  };
};

module.exports = function (env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production" : "development";

  const config = isProduction ? prodConfig : devConfig;

  return merge(commonConfig(isProduction), config);
};
