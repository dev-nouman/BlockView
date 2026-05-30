import React from "react";
import { exportCSV } from "../../../utils/exportCSV";
import { exportPDF } from "../../../utils/exportPDF";
import "./ExportButtons.css";

const ExportButtons = ({ tableData = [], totalInvestment = 0, currentValue = 0 }) => {
  return (
    <div className="export-bar">
      <button className="btn" onClick={() => exportCSV(tableData)}>
        ⬇ Export CSV
      </button>
      <button className="btn primary" onClick={() => exportPDF(tableData, totalInvestment, currentValue)}>
        ⬇ Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;