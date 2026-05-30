import Papa from "papaparse";

export const exportCSV = (tableData) => {
  if (!tableData || tableData.length === 0) {
    alert("No portfolio data to export.");
    return;
  }

  const rows = tableData.map((coin) => ({
    "#": coin.id,
    Coin: coin.name,
    Symbol: coin.symbol,
    "Current Price (USD)": coin.price,
    "Investment (USD)": parseFloat(coin.investment.toFixed(2)),
    "Coins Held": coin.coins,
    "Current Value (USD)": parseFloat(coin.value.toFixed(2)),
    "P/L (%)": coin.pl,
  }));

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `blockview_portfolio_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};