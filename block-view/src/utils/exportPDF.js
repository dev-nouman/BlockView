import jsPDF from "jspdf";

export const exportPDF = (tableData, totalInvestment = 0, currentValue = 0) => {
  if (!tableData || tableData.length === 0) {
    alert("No portfolio data to export.");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 32;
  const colWidths = [24, 90, 52, 80, 80, 52, 80, 56];
  const headers = ["#", "Coin", "Symbol", "Price (USD)", "Investment", "Coins", "Value", "P/L (%)"];
  const rowHeight = 20;
  let y = margin;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 44, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("BlockView – Portfolio Report", margin, 28);
  const now = new Date().toLocaleString();
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Exported: ${now}`, pageWidth - margin, 28, { align: "right" });

  y = 60;

  const profit = currentValue - totalInvestment;
  const profitPct = totalInvestment > 0 ? ((profit / totalInvestment) * 100).toFixed(2) : "0.00";
  const isGain = profit >= 0;

  const summaryItems = [
    ["Total Investment", `$${totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 2 })}`],
    ["Current Value", `$${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`],
    ["P/L", `${isGain ? "+" : ""}$${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${profitPct}%)`],
  ];

  const boxW = (pageWidth - margin * 2) / summaryItems.length;
  summaryItems.forEach(([label, value], i) => {
    const bx = margin + i * boxW;
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(bx, y, boxW - 8, 36, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 120);
    doc.text(label.toUpperCase(), bx + 8, y + 12);
    doc.setFontSize(11);
    if (label === "P/L") {
      doc.setTextColor(isGain ? 22 : 220, isGain ? 163 : 38, isGain ? 74 : 38);
    } else {
      doc.setTextColor(15, 23, 42);
    }
    doc.text(value, bx + 8, y + 27);
  });

  y += 50;

  let x = margin;
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, pageWidth - margin * 2, rowHeight, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  headers.forEach((h, i) => {
    doc.text(h, x + 4, y + 13);
    x += colWidths[i];
  });
  y += rowHeight;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  tableData.forEach((coin, rowIdx) => {
    if (rowIdx % 2 === 0) {
      doc.setFillColor(250, 251, 253);
      doc.rect(margin, y, pageWidth - margin * 2, rowHeight, "F");
    }

    const pl = parseFloat(coin.pl);
    const cells = [
      String(coin.id),
      coin.name.length > 14 ? coin.name.slice(0, 13) + "…" : coin.name,
      coin.symbol,
      `$${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      `$${coin.investment.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      String(coin.coins),
      `$${coin.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      `${pl >= 0 ? "+" : ""}${coin.pl}%`,
    ];

    x = margin;
    cells.forEach((cell, i) => {
      if (i === 7) {
        doc.setTextColor(pl >= 0 ? 22 : 220, pl >= 0 ? 163 : 38, pl >= 0 ? 74 : 38);
      } else {
        doc.setTextColor(30, 30, 30);
      }
      doc.text(cell, x + 4, y + 13);
      x += colWidths[i];
    });

    y += rowHeight;

    if (y > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  });

  doc.setDrawColor(200, 200, 210);
  doc.line(margin, y, pageWidth - margin, y);
  doc.save(`blockview_portfolio_${Date.now()}.pdf`);
};