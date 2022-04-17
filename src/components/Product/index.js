import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";

import { addToCart } from "../../redux/actions/cart.action";

import "./style.css";

const Item = ({ product }) => {
  const dispatch = useDispatch();

  function onAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="item">
      <h4 className="name">{product.name}</h4>
      <img src={product.image} alt={product.name} height="100" width="100" />
      <h4 className="price">
        <b>Price: </b>${product.price}/kg
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={onAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default Item;
