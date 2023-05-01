import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
// import { Icon } from "@ant-design/compatible";
import { Routes, Link } from "react-router-dom";
import { RouteWithSubRoutes } from "../routes";
import * as Icon from "@ant-design/icons";
import { observer, inject } from "mobx-react";
const { Header, Content, Footer, Sider } = Layout;

const Container = (props) => {
  console.log(props, "props");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState("0");
  const [menuList, setMenuList] = useState([]);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const menuClick = (e) => {
    setSelectedKeys(e.key);
  };
  useEffect(() => {
    // this.props.getMenuList();
  }, []);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">{`${process.env.REACT_APP_PROJECT_NAME}`}</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        ></Menu>
      </Header>
      <Content>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["0"]}
              selectedKeys={[selectedKeys]}
              onClick={this.menuClick}
            >
              {menuList.map((e, index) => (
                <Menu.Item key={index}>
                  <Link to={"/app/" + e.url}>
                    {/* <Icon type={e.icon} /> */}
                    <Icon
                      type={e.icon} //图标样式
                      theme="filled" //风格，实心，描线，双色等 （filled ， outlined ， twoTone）
                      spin //是否旋转动画  ，bollean ，false默认
                      twoToneColor="#333" //双色图标设置，双色图标的主要颜色
                    />
                    <span>{e.name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              {/* <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              /> */}
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 0,
                background: "#fff",
                minHeight: 580,
              }}
            >
              <Routes>
                {Routes.map((route, i) => (
                  <RouteWithSubRoutes
                    key={i}
                    {...route}
                    permission={props.global.permission}
                  />
                ))}
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Content>
    </Layout>
  );
};
export default inject("global")(observer(Container));
