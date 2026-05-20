import React from "react";
import "./ExportButtons.css";

const ExportButtons = () => {
    return (
        <div className="export-bar">

            <button className="btn">Export CSV</button>
            <button className="btn primary">Export PDF</button>

        </div>
    );
};

export default ExportButtons;