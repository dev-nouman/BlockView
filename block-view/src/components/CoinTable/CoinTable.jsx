import React from 'react'
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import "./CoinTable.css";

const CoinTable = ({ coins }) => {
    return (
        <div className="table-container">

            <table className="coin-table">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Market Cap</th>
                        <th>Watchlist</th>
                    </tr>
                </thead>

                <tbody>

                    {coins.map((coin) => (
                        <tr key={coin.id}>

                            <td>{coin.rank}</td>

                            <td className="coin-info">

                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                />

                                <div>
                                    <h4>{coin.name}</h4>
                                    <p>{coin.symbol}</p>
                                </div>

                            </td>

                            <td>${coin.price.toLocaleString()}</td>

                            <td
                                className={
                                    coin.change > 0
                                        ? "green"
                                        : "red"
                                }
                            >
                                {coin.change}%
                            </td>

                            <td>${coin.marketCap}</td>

                            <td className='watchlist-icon '>
                                <FiStar />
                                <button className="icon-add">
                                    <FiPlus />
                                </button>
                            </td>



                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default CoinTable;