import React from "react";
import "./noDataFound.scss";
import { NoDataFound } from "../../icons/noDataFound";

const NoDataFoundComponent: React.FC<NoDataFoundProps> = ({ message = "No data found" }) => {
  return (
    <div className="no-data-container">
      <div className="user-icon">
        <NoDataFound />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default NoDataFoundComponent;
