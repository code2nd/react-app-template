const presets = [
  [
    "@babel/preset-env",
    {
      // false: 不用任何polyfill相关代码
      // usage: 代码中需要哪些polyfill，就引用相关api
      // entry：手动在入口文件中导入core-js和regenerator-runtime，根据目标浏览器引入所对应的所有polyfill
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
  ["@babel/preset-react"],
];

const plugins = [
  [
    "import",
    {
      libraryName: "antd",
      style: "css",
    },
  ],
];

const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  plugins.push(["react-refresh/babel"]);
}

module.exports = {
  presets,
  plugins,
};
