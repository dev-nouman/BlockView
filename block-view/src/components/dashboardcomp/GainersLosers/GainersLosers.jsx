import React, { useState } from "react";
import "./GainersLosers.css";

const GainersLosers = () => {
  const [tab, setTab] = useState("gainers");

  const gainers = [
    { name: "BTC", change: "+5.2%" },
    { name: "ETH", change: "+3.1%" },
    { name: "SOL", change: "+2.4%" },
  ];

  const losers = [
    { name: "XRP", change: "-2.1%" },
    { name: "DOGE", change: "-3.4%" },
    { name: "ADA", change: "-1.8%" },
  ];

  const data = tab === "gainers" ? gainers : losers;

  return (
    <div className="dash-card">

      <div className="tabs">
        <button
          className={tab === "gainers" ? "active" : ""}
          onClick={() => setTab("gainers")}
        >
          Top Gainers
        </button>

        <button
          className={tab === "losers" ? "active" : ""}
          onClick={() => setTab("losers")}
        >
          Top Losers
        </button>
      </div>

      <div className="list">
        {data.map((coin, index) => (
          <div className="row" key={index}>
            <span>{coin.name}</span>
            <span className={tab === "gainers" ? "green" : "red"}>
              {coin.change}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default GainersLosers;