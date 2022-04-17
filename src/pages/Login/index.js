import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import AuthLayout from "../../components/AuthLayout";

import { authenticateUser } from "../../redux/actions/auth.action";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const onFinish = async (values) => {
    dispatch(authenticateUser(values));
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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Login;
