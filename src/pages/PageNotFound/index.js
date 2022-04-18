import React from "react";
import DefaultLayout from "../../components/DefaultLayout";

import "./style.css";

const PageNotFound = () => {
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-center align-items-center content-div">
        <h1>Page Not Found</h1>
      </div>
    </DefaultLayout>
  );
};

export default PageNotFound;
