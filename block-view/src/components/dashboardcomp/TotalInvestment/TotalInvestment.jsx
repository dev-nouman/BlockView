import React from "react";
import "./TotalInvestment.css";

const TotalInvestment = ({
  totalInvestment,
}) => {

  return (
    <div className="dash-card">

      <h4>Total Investment</h4>

      <h2>
        ${totalInvestment.toLocaleString()}
      </h2>

    </div>
  );
};

export default TotalInvestment;