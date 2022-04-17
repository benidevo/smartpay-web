import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout";

import "./style.css";
import {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../redux/actions/products.action";

const Items = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [edit, setEdit] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onFinish = async (values) => {
    if (!edit) {
      dispatch(addProduct(values));
      setModalVisibility(false);
    } else {
      dispatch(editProduct(values, edit._id));
      setModalVisibility(false);
    }
  };

  const onDelete = async (id) => {
    dispatch(deleteProduct(id));
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
          <DeleteOutlined className="mx-2" onClick={() => onDelete(id)} />
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
      <Table columns={columns} dataSource={products} bordered pagination={false}/>

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
