import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout";

import "./style.css";

const Items = () => {
  const [itemsData, setItemsData] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [edit, setEdit] = useState(null);

  const dispatch = useDispatch();
  const getAllItems = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/items`
      );
      dispatch({ type: "HIDE_LOADING" });
      setItemsData(response.data.items);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const onFinish = async (values) => {
    dispatch({ type: "SHOW_LOADING" });
    let response;
    try {
      if (!edit) {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/items`, values);
        if (!response.data.success) {
          dispatch({ type: "HIDE_LOADING" });
          message.error(response.data.message);
          setModalVisibility(false);
        }
      } else {
        response = await axios.patch(`/items/${edit._id}`, values);
        if (!response.data.success) {
          dispatch({ type: "HIDE_LOADING" });
          message.error(response.data.message);
          setModalVisibility(false);
        }
      }
      dispatch({ type: "HIDE_LOADING" });
      message.success(response.data.message);
      setModalVisibility(false);
      getAllItems();
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    dispatch({ type: "SHOW_LOADING" });
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/items/${id}`
      );
      dispatch({ type: "HIDE_LOADING" });
      if (!response.data.success) {
        message.error(response.data.message);
      } else {
        message.success(response.data.message);
        getAllItems();
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
          <DeleteOutlined className="mx-2" onClick={() => deleteItem(id)} />
        </div>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setModalVisibility(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {modalVisibility && (
        <Modal
          visible={modalVisibility}
          onCancel={() => {
            setModalVisibility(false);
            setEdit(null);
          }}
          title={edit ? "Edit Item" : "Add Item"}
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
