import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";

import "./style.css";

const Item = ({ product }) => {
  const dispatch = useDispatch();

  function addToCart() {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  }

  return (
    <div className="item">
      <h4 className="name">{product.name}</h4>
      <img src={product.image} alt={product.name} height="100" width="100" />
      <h4 className="price">
        <b>Price: </b>${product.price}/kg
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={addToCart}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default Item;
