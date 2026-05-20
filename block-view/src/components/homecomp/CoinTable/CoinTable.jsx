import React, { useEffect, useState } from 'react'
import { FiStar, FiPlus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import {
    getWatchlist,
    saveWatchlist
} from "../../../utils/watchlist";

import "./CoinTable.css";

const CoinTable = ({ coins }) => {

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        setWatchlist(getWatchlist());
    }, []);

    const toggleWatchlist = (coin) => {

        const exists = watchlist.find(
            item => item.id === coin.id
        );

        let updatedWatchlist;

        if (exists) {

            updatedWatchlist = watchlist.filter(
                item => item.id !== coin.id
            );

        } else {

            updatedWatchlist = [...watchlist, coin];
        }

        setWatchlist(updatedWatchlist);

        saveWatchlist(updatedWatchlist);
    };



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
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {coins.map((coin) => {

                        const change = Number(coin.price_change_percentage_24h);
                        const isPositive = change > 0;

                        return (
                            <tr key={coin.id}>

                                <td>{coin.market_cap_rank}</td>

                                <td className="coin-info">
                                    <img src={coin.image} alt={coin.name} />
                                    <div>
                                        <h4>{coin.name}</h4>
                                        <p>{coin.symbol.toUpperCase()}</p>
                                    </div>
                                </td>

                                <td>
                                    ${coin.current_price?.toLocaleString()}
                                </td>

                                <td className={isPositive ? "green" : "red"}>
                                    {isFinite(change) ? `${change.toFixed(2)}%` : "0%"}
                                </td>

                                <td>
                                    ${coin.market_cap?.toLocaleString()}
                                </td>

                                <td>
                                    <div className="actions">

                                        <div onClick={() => toggleWatchlist(coin)}>
                                            {
                                                watchlist.find(item => item.id === coin.id)
                                                    ? <FaStar className="filled-star" />
                                                    : <FiStar />
                                            }
                                        </div>

                                        <button className="icon-add">
                                            <FiPlus />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        );
                    })}

                </tbody>

            </table>

        </div>

    );
};

export default CoinTable;