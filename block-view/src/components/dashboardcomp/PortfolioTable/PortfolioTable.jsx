import React, { useEffect, useState } from "react";
import { getPortfolio } from "../../../utils/portfolio";
import { getTopCoins } from "../../../services/coinGeckoApi";
import "./PortfolioTable.css";

const PortfolioTable = () => {

    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {

        const loadPortfolio = async () => {

            const savedPortfolio = getPortfolio();
            const marketCoins = await getTopCoins();

            const enriched = savedPortfolio.map((item, index) => {

                const coin = marketCoins.find(
                    c => c.id === item.id
                );

                if (!coin) return null;

                const investment =
                    item.buyPrice * item.quantity;

                const value =
                    coin.current_price * item.quantity;

                const profit =
                    value - investment;

                const profitPercent =
                    investment > 0
                        ? ((profit / investment) * 100).toFixed(2)
                        : 0;

                return {
                    id: index + 1,
                    name: coin.name,
                    symbol: coin.symbol.toUpperCase(),
                    price: coin.current_price,
                    investment,
                    coins: item.quantity,
                    value,
                    pl: profitPercent,
                };

            }).filter(Boolean);

            setPortfolio(enriched);

        };

        loadPortfolio();

    }, []);

    if (portfolio.length === 0) {
        return (
            <div className="portfolio-table-card">
                <h4>Portfolio Details</h4>
                <p>No holdings added yet.</p>
            </div>
        );
    }

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

                            <td>
                                ${coin.price.toLocaleString()}
                            </td>

                            <td>
                                ${coin.investment.toLocaleString(
                                    undefined,
                                    {
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </td>

                            <td>
                                {coin.coins}
                            </td>

                            <td>
                                ${coin.value.toLocaleString(
                                    undefined,
                                    {
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </td>

                            <td
                                className={
                                    Number(coin.pl) >= 0
                                        ? "green"
                                        : "red"
                                }
                            >
                                {coin.pl}%
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default PortfolioTable;