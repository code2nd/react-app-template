import React from "react";
import { Typography, Image } from "antd";
import Testpic from "@/assets/images/test.png";

import "./index.css";

const { Title } = Typography;

const PageC = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        打包媒体文件
      </Title>
      <div>
        打包图片：
        <Image width={200} height={200} src={Testpic} />
      </div>
      <div>
        打包字体文件：<i className="iconfont icon-react test-react-icon"></i>
      </div>
    </>
  );
};

export default PageC;
