import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Spin } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  LogoutOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.productsReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    console.log(window.innerWidth);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const windowWidth = window.innerWidth < 768;
  useEffect(() => {
    if (windowWidth) {
      setCollapsed(true);
    }
  }, [windowWidth, collapsed]);

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <Layout>
      {loading && <Spin size="large" className="spinner" />}
      <Sider
        trigger={null}
        collapsible
        collapsed={() => {
          if (windowWidth) {
            return true;
          }
          return collapsed;
        }}
      >
        <div className="logo">
          <h3 onClick={redirectToHome} className="cursor-pointer">
            {!windowWidth || !collapsed ? "SmartPay" : "SP"}
          </h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ShoppingOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          {localStorage.getItem("accessToken") ? (
            <Menu.Item key="6" icon={<LogoutOutlined />} onClick={logout}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="6" icon={<LoginOutlined />} onClick={logout}>
              <Link to="/logout">Login</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 10 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div
            className="cursor-pointer d-flex align-items-center"
            onClick={() => navigate("/cart")}
          >
            <b>
              <p className="mt-3 mr-2">{cartItems.length}</p>
            </b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "10px",
            padding: 24,
            minHeight: "80vh",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
