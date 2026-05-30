import React, { useEffect, useState } from "react";
import { getPortfolio } from "../../../utils/portfolio";
import { getTopCoins } from "../../../services/coinGeckoApi";
import "./GainersLosers.css";

const GainersLosers = () => {

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);

    useEffect(() => {

        const loadData = async () => {

            const saved = getPortfolio();
            const market = await getTopCoins();

            const enriched = saved.map(item => {

                const coin = market.find(
                    c => c.id === item.id
                );

                if (!coin) return null;

                const investment =
                    item.buyPrice * item.quantity;

                const value =
                    coin.current_price * item.quantity;

                const profitPercent =
                    investment > 0
                        ? ((value - investment) / investment) * 100
                        : 0;

                return {
                    symbol: coin.symbol.toUpperCase(),
                    profitPercent
                };

            }).filter(Boolean);

            // ✅ STRICT separation (THIS FIXES YOUR BUG)
            const gainersList = enriched
                .filter(c => c.profitPercent > 0)
                .sort((a, b) => b.profitPercent - a.profitPercent)
                .slice(0, 3);

            const losersList = enriched
                .filter(c => c.profitPercent < 0)
                .sort((a, b) => a.profitPercent - b.profitPercent)
                .slice(0, 3);

            setGainers(gainersList);
            setLosers(losersList);

        };

        loadData();

    }, []);

    return (
        <div className="gl-card">

            <div className="gl-section">

                <h4>Top Gainers</h4>

                {gainers.length === 0 ? (
                    <p>No gainers</p>
                ) : (
                    gainers.map((c, i) => (
                        <div key={i} className="gl-item green">
                            <span>{c.symbol}</span>
                            <span>+{c.profitPercent.toFixed(2)}%</span>
                        </div>
                    ))
                )}

            </div>

            <div className="gl-section">

                <h4>Top Losers</h4>

                {losers.length === 0 ? (
                    <p>No losers</p>
                ) : (
                    losers.map((c, i) => (
                        <div key={i} className="gl-item red">
                            <span>{c.symbol}</span>
                            <span>{c.profitPercent.toFixed(2)}%</span>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default GainersLosers;