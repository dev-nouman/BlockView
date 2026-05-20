import React from "react";
import "./CurrentValue.css";

const CurrentValue = () => {
  return (
    <div className="dash-card">
      <h4>Current Value</h4>
      <h2>$12,450</h2>
      <p className="positive">+2.4%</p>
    </div>
  );
};

export default CurrentValue;