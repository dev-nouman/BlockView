import React from "react";
import "./PortfolioTable.css";

const PortfolioTable = () => {
    const portfolio = [
        {
            id: 1,
            name: "Bitcoin",
            symbol: "BTC",
            price: 42000,
            investment: 5000,
            coins: 0.12,
            value: 5040,
            pl: "+0.8%",
        },
        {
            id: 2,
            name: "Ethereum",
            symbol: "ETH",
            price: 2500,
            investment: 3000,
            coins: 1.2,
            value: 3200,
            pl: "+6.6%",
        },
        {
            id: 3,
            name: "Solana",
            symbol: "SOL",
            price: 120,
            investment: 1500,
            coins: 12.5,
            value: 1400,
            pl: "-6.6%",
        },
    ];

    return (
        <div className="portfolio-table-card">

            <h4>Portfolio Details</h4>

            <table>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Investment</th>
                        <th>Coins</th>
                        <th>Value</th>
                        <th>P/L</th>
                    </tr>
                </thead>

                <tbody>
                    {portfolio.map((coin) => (
                        <tr key={coin.id}>
                            <td>{coin.id}</td>

                            <td>
                                <div className="coin-name">
                                    <strong>{coin.symbol}</strong>
                                    <span>{coin.name}</span>
                                </div>
                            </td>

                            <td>${coin.price}</td>
                            <td>${coin.investment}</td>
                            <td>{coin.coins}</td>
                            <td>${coin.value}</td>

                            <td className={coin.pl.includes("-") ? "red" : "green"}>
                                {coin.pl}
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default PortfolioTable;