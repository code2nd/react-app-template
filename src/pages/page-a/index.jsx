import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "antd";

import SongList from "./components/songList";

import { getSongList } from "@/store/page-a/actionCreators";

const { Title } = Typography;

const PageA = () => {
  const dispatch = useDispatch();

  const handleChagePage = (page) => {
    dispatch(getSongList({ page, pageSize: 5 }));
  };

  useEffect(() => {
    dispatch(getSongList({ page: 1, pageSize: 5 }));
  }, []);

  return (
    <>
      <Title level={1} style={{ textAlign: "center" }}>
        欢迎使用 create-new-app-cli 创建项目！
      </Title>
      <SongList handleChagePage={handleChagePage} />
    </>
  );
};

export default PageA;
