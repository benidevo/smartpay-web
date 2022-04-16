import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { EyeOutlined } from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout";
import axios from "axios";
import { message, Table, Modal, Button } from "antd";

import "./style.css";

const Bills = () => {
  const componentRef = useRef();
  const [billData, setBillsData] = useState([]);
  const [billDetailsModal, setBillDetailsModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBills();
  }, []);

  const getAllBills = async () => {
    dispatch({ type: "SHOW_LOADING" });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bills`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch({ type: "HIDE_LOADING" });
      setBillsData(response.data.bills);
    } catch (error) {
      console.log(error);
      dispatch({ type: "HIDE_LOADING" });
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const column = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "View",
      dataIndex: "_id",
      render: (id, record) => (
        <EyeOutlined
          onClick={() => {
            const bill = id === record._id ? record : null;
            setSelectedBill(bill);
            setBillDetailsModal(true);
          }}
        />
      ),
    },
  ];
  const billDetailsColumn = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price/kg",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "_id",
      render: (id, record) => record.price * record.quantity,
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <h3>Bills</h3>
      <Table columns={column} dataSource={billData} />
      {billDetailsModal && (
        <Modal
          visible={billDetailsModal}
          onCancel={() => setBillDetailsModal(false)}
          title="Bill Details"
          width={800}
          className="bill-modal"
          footer={false}
        >
          <div ref={componentRef} className="p-4">
            <div className="d-flex justify-content-between dashed-border pb-2">
              <div>
                <h1>
                  <b>ABC Stores</b>
                </h1>
              </div>
              <div>
                <p>14 Parkview Crescent</p>
                <p>Lagos 56790</p>
                <p>08087875432</p>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <p>
                <b>Name</b>: {selectedBill.customerName}
              </p>
              <p>
                <b>Phone</b>: {selectedBill.phone}
              </p>
              <p>
                <b>Date</b>:{" "}
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>

            <Table
              columns={billDetailsColumn}
              dataSource={selectedBill.cartItems}
              bordered
              pagination={false}
            />
            <div className="mt-2 dashed-border pb-2">
              <p>
                <b>Subtotal</b>: ${selectedBill.subtotal}
              </p>
              <p>
                <b>Tax</b>: ${selectedBill.tax}
              </p>
            </div>
            <div className="dashed-border pb-3 pt-3">
              <h3>
                <b>Total</b>: ${selectedBill.total}
              </h3>
            </div>
            <div className="text-center mt-2">
              <p>Thanks</p>
              <p>ABC Stores</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              type="primary"
              onClick={() => {
                setBillDetailsModal(false);
                handlePrint();
              }}
            >
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Bills;
