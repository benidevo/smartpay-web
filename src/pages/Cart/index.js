import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table, Input, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout";

import "./style.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [subtotal, setSubtotal] = useState(0);
  const [chargeBillModal, setChargeBillModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  }, [cartItems]);

  const increaseQuantity = (record) => {
    dispatch({
      type: "UPDATE_CART_ITEMS",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART_ITEMS",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const deleteItem = (record) => {
    dispatch({
      type: "DELETE_CART_ITEM",
      payload: record,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="product" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            onClick={() => increaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => decreaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => deleteItem(record)} />
      ),
    },
  ];

  const onFinish = async (values) => {
    const data = {
      ...values,
      subtotal,
      cartItems,
      tax: (subtotal * 0.1).toFixed(2),
      total: (subtotal * 1.1).toFixed(2),
    };
    dispatch({ type: "SHOW_LOADING" });
    let response;
    try {
      response = await axios.post("/bills", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "HIDE_LOADING" });
      message.success(response.data.message);
      dispatch({ type: "SHOW_LOADING" });
      setTimeout(() => {
        dispatch({ type: "HIDE_LOADING" });
        setChargeBillModal(false);
        navigate("/bills");
      }, 1000);
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
    }
  };

  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <Table columns={columns} dataSource={cartItems} pagination={false} />
      <hr />
      <div className="d-flex justify-content-end align-items-end flex-column">
        <div className="subtotal">
          <h3>
            Sub Total: <b>${subtotal}</b>
          </h3>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setChargeBillModal(true);
          }}
        >
          Charge Bill
        </Button>
      </div>
      <Modal
        visible={chargeBillModal}
        title="Charge Bill"
        onCancel={() => setChargeBillModal(false)}
        footer={false}
        onFinish={onFinish}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Customer Name" name="customerName" required={true}>
            <Input type="text" placeholder="John Doe" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone" required={true}>
            <Input type="tel" placeholder="0803453213" />
          </Form.Item>
          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            required={true}
          >
            <Select>
              <Select.Option value="CASH">Cash</Select.Option>
              <Select.Option value="CARD">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="charge-bill-amount">
            <h5>
              Subtotal: <b>${subtotal}</b>
            </h5>
            <h5>
              Tax: <b>${(subtotal * 0.1).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Total: <b>${(subtotal * 1.1).toFixed(2)}</b>
            </h2>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Charge Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default Cart;
