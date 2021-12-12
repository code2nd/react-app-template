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
    // context: base directory 默认是当前app的根目录,
    // entry写上相对路径时，并不是相对于文件所在的路径，而是相对于context配置的路径
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
      chunkIds: "deterministic", // natural: 使用自然数(不推荐) named: 使用包所在目录作为name(在开发环境推荐) deterministic: 生成id，针对相同文件生成的id是不变的
      // tree shaking
      usedExports: true,
      // 代码分割
      splitChunks: {
        chunks: "all", // async - 异步导入的代码做分离  initial -- 同步导入的代码做分离  all -- 同步异步导入的都做分离
        /*  minSize: 200000, // 最小尺寸如果拆分出来一个包，那么拆分出来的这个包的大小最小为minSize
        maxSize: 200000, // 将大于maxSize的包拆分成不小于minSize的包
        minChunks: 1, // 引入的包至少被导入了几次才拆分 */
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            // name: "vendors",
            filename: "static/js/[id].[contenthash:8].venders.js",
            chunks: "all",
          },
        },
      },
      // true/multiple single
      runtimeChunk: {
        // 这个name会放到output.filename里的name占位符里面
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
