import React from "react";
import CurrentValue from "../../components/dashboardcomp/CurrentValue/CurrentValue";
import TotalInvestment from "../../components/dashboardcomp/TotalInvestment/TotalInvestment";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="dashboard-grid-top">
        <CurrentValue />
        <TotalInvestment />
      </div>

    </div>
  );
};

export default Dashboard;