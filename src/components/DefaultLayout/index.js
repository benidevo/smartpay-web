import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./styles.css";

const { Header, Sider, Content } = Layout;

export default class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <h3>SmartPay</h3>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UnorderedListOutlined />}>
              <Link to="/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined />}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "10px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
