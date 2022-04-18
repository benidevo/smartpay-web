import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import AuthLayout from "../../components/AuthLayout";

import { registerUser } from "../../redux/actions/auth.action";

import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const password = values.password;
    const confirmPassword = values.confirmPassword;
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
    } else {
      dispatch(registerUser(values));
    }
  };

  return (
    <AuthLayout imageUrl="https://images.unsplash.com/photo-1602665742701-389671bc40c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80">
      <Form className="form" onFinish={onFinish}>
        <h1>Sign up to SmartPay</h1>
        <Form.Item
          className="form-item"
          name="name"
          rules={[
            {
              required: true,
              message: "Name is required!",
              type: "string",
            },
          ]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          name="email"
          required
          rules={[
            {
              required: true,
              message: "provide a valid email",
              type: "email",
            },
          ]}
        >
          <Input placeholder="email" required />
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
              message: "password must be at least 6 characters",
              type: "string",
            },
          ]}
          type="password"
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          type="password"
        >
          <Input placeholder="Confirm Password" required />
        </Form.Item>
        <Link to="/login">Login </Link>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Register;
