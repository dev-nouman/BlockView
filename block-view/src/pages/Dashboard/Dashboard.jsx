import React from "react";
import CurrentValue from "../../components/dashboardcomp/CurrentValue/CurrentValue";
import TotalInvestment from "../../components/dashboardcomp/TotalInvestment/TotalInvestment";
import PortfolioAllocation from "../../components/dashboardcomp/PortfolioAllocation/PortfolioAllocation";
import GainersLosers from "../../components/dashboardcomp/GainersLosers/GainersLosers";
import PortfolioTable from "../../components/dashboardcomp/PortfolioTable/PortfolioTable";
import ExportButtons from "../../components/dashboardcomp/ExportButtons/ExportButtons";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="dashboard-grid-top">
        <CurrentValue />
        <TotalInvestment />
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