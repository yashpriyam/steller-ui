import React from "react";
import "./loading.scss";

const LoadingComponent = ({ windowHeight }) => {
  return (
    <>
      <section className="loading" style={{ height: windowHeight }}>
        <div></div>
      </section>
    </>
  );
};

export default LoadingComponent;
