import React, { useState } from "react";
import { Button, Typography } from "antd";
import LoadPage from "components/loadPage";

const { Title } = Typography;

const PageB = () => {
  const [isShow, setIsShow] = useState(false);

  const PrefetchedModule = React.lazy(() =>
    import(
      /* webpackChunkName: 'prefetchedModule' */
      /* webpackPrefetch: true */
      "./components/prefetchedModle"
    )
  );

  const handlePrefetchModule = () => {
    setIsShow(true);
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        通过prefetch预加载的模块
      </Title>
      <Button onClick={handlePrefetchModule}>预获取(prefetch)模块</Button>
      {isShow && LoadPage(PrefetchedModule)}
    </>
  );
};

export default PageB;
