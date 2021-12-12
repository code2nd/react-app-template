import React, { memo } from "react";
import { useSelector } from "react-redux";
import { List, Avatar, Image } from "antd";
import "./index.css";

const SongList = memo((props) => {
  const { songList, count } = useSelector((state) => state.pagea);

  const handleChagePage = (page) => {
    props.handleChagePage(page);
  };

  return (
    <List
      className="song-list"
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: handleChagePage,
        pageSize: 5,
        total: count,
        hideOnSinglePage: true,
      }}
      dataSource={songList}
      locale={{
        emptyText: "暂无数据",
      }}
      renderItem={(item) => (
        <List.Item
          key={item.song_id}
          extra={<Image width={120} height={120} src={item.pic} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.pic} />}
            title={<a href={item.url}>{item.name}</a>}
            description={item.album_name}
          />
          通过redux管理的异步请求测试数据！！！
        </List.Item>
      )}
    />
  );
});

export default SongList;
