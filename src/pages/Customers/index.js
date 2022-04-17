import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";

import { Table } from "antd";
import { getBills } from "../../redux/actions/bills.action";

// import "./style.css";

const Customers = () => {
  const customersData = useSelector((state) => state.billsReducer.bills);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBills);
  }, []);

  const column = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => value.toString().substring(0, 10),
    },
  ];

  return (
    <DefaultLayout>
      <h3>Customers</h3>
      <Table columns={column} dataSource={customersData} pagination={false} />
    </DefaultLayout>
  );
};

export default Customers;
