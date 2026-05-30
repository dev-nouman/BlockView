import React, { useEffect, useState } from "react";
import { getTopCoins } from "../../services/coinGeckoApi";
import { usePortfolioContext } from "../../context/PortfolioContext";

import CurrentValue from "../../components/dashboardcomp/CurrentValue/CurrentValue";
import TotalInvestment from "../../components/dashboardcomp/TotalInvestment/TotalInvestment";
import PortfolioAllocation from "../../components/dashboardcomp/PortfolioAllocation/PortfolioAllocation";
import GainersLosers from "../../components/dashboardcomp/GainersLosers/GainersLosers";
import PortfolioTable from "../../components/dashboardcomp/PortfolioTable/PortfolioTable";
import ExportButtons from "../../components/dashboardcomp/ExportButtons/ExportButtons";

import "./Dashboard.css";

const Dashboard = () => {

  const { portfolio } = usePortfolioContext();
  const [marketCoins, setMarketCoins] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  // Load market data once
  useEffect(() => {
    const loadMarketData = async () => {
      const market = await getTopCoins();
      setMarketCoins(market);
    };
    loadMarketData();
  }, []);

  // Update totals whenever portfolio or market data changes
  useEffect(() => {
    let investment = 0;
    let current = 0;

    portfolio.forEach(item => {
      const coin = marketCoins.find(c => c.id === item.id);
      if (!coin) return;

      investment += item.buyPrice * item.quantity;
      current += coin.current_price * item.quantity;
    });

    setTotalInvestment(investment);
    setCurrentValue(current);
  }, [portfolio, marketCoins]);

  return (
    <div className="dashboard">

      <div className="dashboard-grid-top">
        <CurrentValue
          currentValue={currentValue}
          totalInvestment={totalInvestment}
        />

        <TotalInvestment
          totalInvestment={totalInvestment}
        />
      </div>

      <div className="dashboard-grid-middle">
        <PortfolioAllocation
          portfolio={portfolio}
          market={marketCoins}
        />

        <GainersLosers
          portfolio={portfolio}
          market={marketCoins}
        />
      </div>

      <PortfolioTable
        portfolio={portfolio}
        market={marketCoins}
      />

      <ExportButtons />

    </div>
  );
};

export default Dashboard;