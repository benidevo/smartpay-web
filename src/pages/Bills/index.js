import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { EyeOutlined } from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout";
import { Table, Modal, Button } from "antd";
import { getBills } from "../../redux/actions/bills.action";

import "./style.css";

const Bills = () => {
  const { bills } = useSelector((state) => state.billsReducer);
  const componentRef = useRef();

  const [billDetailsModal, setBillDetailsModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBills());
  }, []);

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
      <Table columns={column} dataSource={bills} pagination={false} />
      {billDetailsModal && (
        <Modal
          visible={billDetailsModal}
          onCancel={() => setBillDetailsModal(false)}
          title="Bill Details"
          // width={800}
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
                <p>Parkview Crescent</p>
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
              scroll={{ x: true }}
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
