import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout";

import "./style.css";

const Items = () => {
  const [productsData, setProductsData] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [edit, setEdit] = useState(null);

  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch({ type: "HIDE_LOADING" });
      setProductsData(response.data.products);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const onFinish = async (values) => {
    dispatch({ type: "SHOW_LOADING" });
    let response;
    try {
      if (!edit) {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/products`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!response.data.success) {
          dispatch({ type: "HIDE_LOADING" });
          message.error(response.data.message);
          setModalVisibility(false);
        }
      } else {
        response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/products/${edit._id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!response.data.success) {
          dispatch({ type: "HIDE_LOADING" });
          message.error(response.data.message);
          setModalVisibility(false);
        }
      }
      dispatch({ type: "HIDE_LOADING" });
      message.success(response.data.message);
      setModalVisibility(false);
      getAllProducts();
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    dispatch({ type: "SHOW_LOADING" });
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch({ type: "HIDE_LOADING" });
      if (!response.data.success) {
        message.error(response.data.message);
      } else {
        message.success(response.data.message);
        getAllProducts();
      }
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something went wrong");
      console.log(error);
    }
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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setModalVisibility(true);
              setEdit(record);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteProduct(id)} />
        </div>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Products</h3>
        <Button type="primary" onClick={() => setModalVisibility(true)}>
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={productsData} bordered />

      {modalVisibility && (
        <Modal
          visible={modalVisibility}
          onCancel={() => {
            setModalVisibility(false);
            setEdit(null);
          }}
          title={edit ? "Edit Product" : "Add Product"}
          footer={false}
        >
          <Form initialValues={edit} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <Input type="text" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input type="text" />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input type="number" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Items;
