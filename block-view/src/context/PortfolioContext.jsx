import React, { useState, useEffect } from "react";
import { getPortfolio, savePortfolio } from "../utils/portfolio";

const PortfolioContext = React.createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);

  // Load portfolio from localStorage on mount
  useEffect(() => {
    setPortfolio(getPortfolio());
  }, []);

  const updatePortfolio = (data) => {
    setPortfolio(data);
    savePortfolio(data);
  };

  const addCoin = (coin) => {
    const existing = getPortfolio();
    const updated = [...existing, coin];
    updatePortfolio(updated);
  };

  const removeCoin = (coinId, quantity) => {
    const existing = getPortfolio();
    const updated = existing
      .map((item) => {
        if (item.id !== coinId) return item;
        return { ...item, quantity: item.quantity - quantity };
      })
      .filter((item) => item.quantity > 0);
    updatePortfolio(updated);
  };

  const refreshPortfolio = () => {
    setPortfolio(getPortfolio());
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        updatePortfolio,
        addCoin,
        removeCoin,
        refreshPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => {
  const context = React.useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioContext must be used within PortfolioProvider");
  }
  return context;
};

export default PortfolioContext;

