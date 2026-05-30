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
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getTopCoins().then(setMarketCoins);
  }, []);

  useEffect(() => {
    let investment = 0;
    let current = 0;

    const enriched = portfolio.map((item, index) => {
      const coin = marketCoins.find(c => c.id === item.id);
      if (!coin) return null;

      const inv = item.buyPrice * item.quantity;
      const val = coin.current_price * item.quantity;
      const profit = val - inv;
      const profitPercent = inv > 0 ? ((profit / inv) * 100).toFixed(2) : 0;

      investment += inv;
      current += val;

      return {
        id: index + 1,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        investment: inv,
        coins: item.quantity,
        value: val,
        pl: profitPercent,
      };
    }).filter(Boolean);

    setTotalInvestment(investment);
    setCurrentValue(current);
    setTableData(enriched);
  }, [portfolio, marketCoins]);

  return (
    <div className="dashboard">
      <div className="dashboard-grid-top">
        <CurrentValue currentValue={currentValue} totalInvestment={totalInvestment} />
        <TotalInvestment totalInvestment={totalInvestment} />
      </div>
      <div className="dashboard-grid-middle">
        <PortfolioAllocation portfolio={portfolio} market={marketCoins} />
        <GainersLosers portfolio={portfolio} market={marketCoins} />
      </div>
      <ExportButtons tableData={tableData} totalInvestment={totalInvestment} currentValue={currentValue} />
      <PortfolioTable portfolio={portfolio} market={marketCoins} />
    </div>
  );
};

export default Dashboard;