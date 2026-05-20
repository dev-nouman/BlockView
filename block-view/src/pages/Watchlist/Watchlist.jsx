import React, { useEffect, useState } from 'react'
import CoinTable from '../../components/CoinTable/CoinTable'
import { getWatchlist } from '../../utils/watchlist'
import './Watchlist.css'

const Watchlist = () => {

  const [coins, setCoins] = useState([])

  useEffect(() => {
    setCoins(getWatchlist())
  }, [])

  return (
    <div className="watchlist-page">

      <h1 className="title">Watchlist</h1>

      {
        coins.length > 0 ? (
          <CoinTable coins={coins} />
        ) : (
          <div className="empty">
            <h2>No coins in your watchlist</h2>
            <p>Add coins from home page ⭐</p>
          </div>
        )
      }

    </div>
  )
}

export default Watchlist