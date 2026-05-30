import React, { useEffect, useState } from 'react'
import { FiStar, FiPlus } from "react-icons/fi"
import { FaStar } from "react-icons/fa"

import {
    getWatchlist,
    saveWatchlist
} from "../../../utils/watchlist"

import BuyModal from '../../commoncomp/BuyModal/BuyModal'
import RemoveModal from "../../commoncomp/RemoveModal/RemoveModal"

import { getPortfolio, savePortfolio } from "../../../utils/portfolio"

import "./CoinTable.css"

const CoinTable = ({ coins }) => {

    const [watchlist, setWatchlist] = useState([])
    const [selectedCoin, setSelectedCoin] = useState(null)
    const [removeCoin, setRemoveCoin] = useState(null)

    useEffect(() => {
        setWatchlist(getWatchlist())
    }, [])

    // WATCHLIST TOGGLE
    const toggleWatchlist = (coin) => {

        const exists = watchlist.find(item => item.id === coin.id)

        let updated

        if (exists) {
            updated = watchlist.filter(item => item.id !== coin.id)
        } else {
            updated = [...watchlist, coin]
        }

        setWatchlist(updated)
        saveWatchlist(updated)
    }

    // BUY COIN
    const handleBuy = (entry) => {

        const existing = getPortfolio()

        const updated = [...existing, entry]

        savePortfolio(updated)
    }

    // REMOVE / SELL COIN
    const handleRemove = ({ coin, quantity }) => {

        const portfolio = getPortfolio()

        const updated = portfolio.map(item => {

            if (item.id !== coin.id) return item

            const newQty = item.quantity - quantity

            return {
                ...item,
                quantity: newQty
            }

        }).filter(item => item.quantity > 0)

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

                                        {/* WATCHLIST */}
                                        <div onClick={() => toggleWatchlist(coin)}>
                                            {
                                                watchlist.find(item => item.id === coin.id)
                                                    ? <FaStar className="filled-star" />
                                                    : <FiStar />
                                            }
                                        </div>

                                        {/* BUY */}
                                        <button
                                            className="icon-add"
                                            onClick={() => setSelectedCoin(coin)}
                                        >
                                            <FiPlus />
                                        </button>

                                        {/* REMOVE (SELL) */}
                                        <button
                                            className="icon-add"
                                            onClick={() => setRemoveCoin(coin)}
                                        >
                                            −
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        )
                    })}

                </tbody>

            </table>

            {/* BUY MODAL */}
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

            {/* REMOVE MODAL */}
            {removeCoin && (
                <RemoveModal
                    coin={removeCoin}
                    onClose={() => setRemoveCoin(null)}
                    onConfirm={(data) => {
                        handleRemove(data)
                        setRemoveCoin(null)
                    }}
                />
            )}

        </div>

    )
}

export default CoinTable