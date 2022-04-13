import React from "react";

import "./style.css";

const AuthLayout = (props) => {
  return (
    <div className="d-flex main-div">
      <img
        src={props.imageUrl}
        alt=""
      />
      <div>{props.children}</div>
    </div>
  );
};

export default AuthLayout;
