import React from "react";
import { Button, Col, Row } from "antd";

import "./style.css";

const Item = ({ item }) => {
  return (
    <div className="item">
      <h4 className="name">{item.name}</h4>
      <img src={item.image} alt={item.name} height="100" width="100" />
      <h4 className="price">Price: ${item.price}/kg</h4>
      <div className="d-flex justify-content-end">
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
};

export default Item;
