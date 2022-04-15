import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import axios from "axios";
import { message, Table } from "antd";

// import "./style.css";

const Customers = () => {
  const [billData, setBillsData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllBills();
  }, []);

  const getAllBills = async () => {
    dispatch({ type: "SHOW_LOADING" });
    try {
      const response = await axios.get("/bills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
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
      <Table columns={column} dataSource={billData} />
    </DefaultLayout>
  );
};

export default Customers;
