import React from "react";
import "./CurrentValue.css";

const CurrentValue = ({
  currentValue,
  totalInvestment,
}) => {

  const profit =
    currentValue - totalInvestment;

  const profitPercent =
    totalInvestment > 0
      ? ((profit / totalInvestment) * 100).toFixed(2)
      : 0;

  return (
    <div className="dash-card">

      <h4>Current Value</h4>

      <h2>
        ${currentValue.toLocaleString()}
      </h2>

      <p
        className={
          profit >= 0
            ? "positive"
            : "negative"
        }
      >
        {profitPercent}%
      </p>

    </div>
  );
};

export default CurrentValue;