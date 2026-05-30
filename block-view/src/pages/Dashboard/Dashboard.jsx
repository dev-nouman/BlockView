import React, { useEffect, useState } from "react";
import { getPortfolio } from "../../utils/portfolio";
import { getTopCoins } from "../../services/coinGeckoApi";

import CurrentValue from "../../components/dashboardcomp/CurrentValue/CurrentValue";
import TotalInvestment from "../../components/dashboardcomp/TotalInvestment/TotalInvestment";
import PortfolioAllocation from "../../components/dashboardcomp/PortfolioAllocation/PortfolioAllocation";
import GainersLosers from "../../components/dashboardcomp/GainersLosers/GainersLosers";
import PortfolioTable from "../../components/dashboardcomp/PortfolioTable/PortfolioTable";
import ExportButtons from "../../components/dashboardcomp/ExportButtons/ExportButtons";
import "./Dashboard.css";

const Dashboard = () => {

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {

    const loadPortfolio = async () => {

      const portfolio = getPortfolio();
      const marketCoins = await getTopCoins();

      let investment = 0;
      let current = 0;

      portfolio.forEach(item => {

        const coin = marketCoins.find(
          c => c.id === item.id
        );

        if (!coin) return;

        investment += item.buyPrice * item.quantity;

        current += coin.current_price * item.quantity;

      });

      setTotalInvestment(investment);
      setCurrentValue(current);

    };

    loadPortfolio();

  }, []);

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
        <PortfolioAllocation />
        <GainersLosers />
      </div>

      <ExportButtons />
      <PortfolioTable />

    </div>
  );
};

export default Dashboard;