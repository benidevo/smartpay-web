import React from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd";

import "./style.css";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  function addToCart() {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  }

  return (
    <div className="item">
      <h4 className="name">{item.name}</h4>
      <img src={item.image} alt={item.name} height="100" width="100" />
      <h4 className="price">
        <b>Price: </b>${item.price}/kg
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={() => addToCart()}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default Item;
