import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import AuthLayout from "../../components/AuthLayout";
import axios from "axios";

import "./style.css";

const Register = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();

  //   const validatePasswords = (rule, value, callback) => {
  //     console.log(form.getFieldsValue(true));
  //     if (value && value !== form.getFieldValue("password")) {
  //       callback("Passwords do not match!");
  //     } else {
  //       callback();
  //     }
  //   };

  const onFinish = async (values) => {
    dispatch({ type: "SHOW_LOADING" });
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        values
      );
      dispatch({ type: "HIDE_LOADING" });
      message.success(response.data.message);
      dispatch({ type: "SHOW_LOADING" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error(error?.response?.data?.message);
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Password is required!",
              type: "string",
            },
            // {
            //   validator: validatePasswords,
            // },
          ]}
          type="password"
        >
          <Input placeholder="Confirm Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Register;
