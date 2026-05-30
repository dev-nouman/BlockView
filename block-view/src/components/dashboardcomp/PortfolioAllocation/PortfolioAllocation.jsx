import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./PortfolioAllocation.css";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const PortfolioAllocation = ({ portfolio = [], market = [] }) => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const enriched = portfolio.map(item => {

            const coin = market.find(
                c => c.id === item.id
            );

            if (!coin) return null;

            const value =
                coin.current_price * item.quantity;

            return {
                name: coin.symbol.toUpperCase(),
                value
            };

        }).filter(Boolean);

        setData(enriched);

    }, [portfolio, market]);

    return (
        <div className="pie-card">

            <h4>Portfolio Allocation</h4>

            <PieChart width={300} height={250}>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >

                    {data.map((_, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}

                </Pie>

                <Tooltip />
                <Legend />

            </PieChart>

        </div>
    );
};

export default PortfolioAllocation;