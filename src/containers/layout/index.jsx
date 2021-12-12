import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname.slice(1) || "page-a"]}
        >
          <Menu.Item key="page-a">
            <Link to="/page-a">page-a</Link>
          </Menu.Item>
          <Menu.Item key="page-b">
            <Link to="/page-b">page-b</Link>
          </Menu.Item>
          <Menu.Item key="page-c">
            <Link to="/page-c">page-c</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
