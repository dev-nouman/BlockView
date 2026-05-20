import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/homecomp/SearchBar/SearchBar'
import CoinTable from '../../components/homecomp/CoinTable/CoinTable'
import { getTopCoins } from '../../services/coinGeckoApi'
import './Home.css'

const Home = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCoins = async () => {

      const data = await getTopCoins()

      console.log("API DATA:", data)

      setCoins(data || [])

      setLoading(false)
    }

    fetchCoins()

  }, [])

  return (
    <div className="homePage">

      <div className="hero">
        <h1>Track Cryptocurrency Prices</h1>
        <p>Stay updated with real-time cryptocurrency prices and track your portfolio.</p>
        <SearchBar />
      </div>

      {
        loading
          ? <h2>Loading...</h2>
          : <CoinTable coins={coins} />
      }

    </div>
  )
}

export default Home