import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Item from "../components/Item";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const getAllItems = async () => {
    try {
      const response = await axios.get("/items/");
      setItemsData(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <Row gutter={20}>
        {itemsData.map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
