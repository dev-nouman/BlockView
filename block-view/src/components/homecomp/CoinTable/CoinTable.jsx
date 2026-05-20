import React, { useEffect, useState } from 'react'
import { FiStar, FiPlus } from "react-icons/fi"
import { FaStar } from "react-icons/fa"
import {
    getWatchlist,
    saveWatchlist
} from "../../../utils/watchlist"

import BuyModal from '../../commoncomp/BuyModal/BuyModal'
import { getPortfolio, savePortfolio } from '../../../utils/portfolio'

import "./CoinTable.css"

const CoinTable = ({ coins }) => {

    const [watchlist, setWatchlist] = useState([])
    const [selectedCoin, setSelectedCoin] = useState(null)

    useEffect(() => {
        setWatchlist(getWatchlist())
    }, [])

    const toggleWatchlist = (coin) => {

        const exists = watchlist.find(item => item.id === coin.id)

        let updatedWatchlist

        if (exists) {
            updatedWatchlist = watchlist.filter(item => item.id !== coin.id)
        } else {
            updatedWatchlist = [...watchlist, coin]
        }

        setWatchlist(updatedWatchlist)
        saveWatchlist(updatedWatchlist)
    }

    const handleBuy = (entry) => {

        const existing = getPortfolio()

        const updated = [...existing, entry]

        savePortfolio(updated)
    }

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

                        const change = Number(coin.price_change_percentage_24h)
                        const isPositive = change > 0

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
                                    {isFinite(change)
                                        ? `${change.toFixed(2)}%`
                                        : "0%"}
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

                                        <button
                                            className="icon-add"
                                            onClick={() => {
                                                setSelectedCoin(coin)
                                            }}
                                        >
                                            <FiPlus />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        )
                    })}

                </tbody>

            </table>

            {/* MODAL */}
            {selectedCoin && (
                <BuyModal
                    coin={selectedCoin}
                    onClose={() => setSelectedCoin(null)}
                    onSave={(data) => {
                        handleBuy(data)
                        setSelectedCoin(null)
                    }}
                />
            )}

        </div>

    )
}

export default CoinTable