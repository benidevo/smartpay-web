import { Col, Divider, Row, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Product from "../../components/Product";
import { getProductsByCategory } from "../../redux/actions/products.action";

import "./style.css";

const Homepage = () => {
  const products = useSelector((state) => state.productsReducer.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCategory("fruits"));
  }, [dispatch]);
  const [selectedCategories, setSelectedCategories] = useState("fruits");
  const categories = [
    {
      name: "fruits",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg",
    },
    {
      name: "vegetables",
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg",
    },
    {
      name: "meat",
      imageUrl:
        "https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive",
    },
  ];

  const selectCategory = async (categoryName) => {
    setSelectedCategories(categoryName);
    dispatch(getProductsByCategory(categoryName));
  };

  return (
    <DefaultLayout>
      <div className="d-flex categories">
        {categories.map((category) => {
          return (
            <div
              className={`d-flex align-items-center category ${
                category.name === selectedCategories ? "selected-category" : ""
              }`}
              onClick={() => selectCategory(category.name)}
            >
              <h4>{category.name}</h4>
              <img
                src={category.imageUrl}
                alt="category"
                width="80"
                height="60"
              />
            </div>
          );
        })}
      </div>
      <Row gutter={20}>
        {products &&
          products.map((product) => {
            return (
              <Col xs={24} lg={6} md={12} sm={6}>
                <Product product={product} />
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
