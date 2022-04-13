import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import AuthLayout from "../../components/AuthLayout";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const onFinish = async (values) => {
    dispatch({ type: "SHOW_LOADING" });
    let response;
    try {
      response = await axios.post("/auth/login", values);
      console.log(response);
      if (!response.data.success) {
        dispatch({ type: "HIDE_LOADING" });
        return message.error(response.data.message);
      }
      dispatch({ type: "HIDE_LOADING" });
      message.success(response.data.message);
      localStorage.setItem("accessToken", response.data.accessToken);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <AuthLayout imageUrl="https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80">
      <Form className="form" onFinish={onFinish}>
        <h1>Login to SmartPay</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please provide a valid email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required!",
              type: "string",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
              type: "string",
            },
          ]}
          type="password"
        >
          <Input placeholder="Password" />
        </Form.Item>
        <div className="d-flex justify-content-space-between">
          <Link to="/register">Register</Link>
          <Button
            type="primary"
            htmlType="submit"
            className="d-flex align-items-end"
          >
            Login
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login;
