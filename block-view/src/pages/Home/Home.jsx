import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/homecomp/SearchBar/SearchBar'
import CoinTable from '../../components/homecomp/CoinTable/CoinTable'
import { getTopCoins } from '../../services/coinGeckoApi'
import './Home.css'

const Home = () => {

  const [coins, setCoins] = useState([])
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCoins = async () => {

      try {

        const data = await getTopCoins()

        console.log("API DATA:", data)

        const safeData = Array.isArray(data) ? data : []

        setCoins(safeData)
        setAllCoins(safeData)

      } catch (err) {
        console.log(err)
        setCoins([])
        setAllCoins([])
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()

  }, [])

  return (
    <div className="homePage">

      <div className="hero">
        <h1>Track Cryptocurrency Prices</h1>
        <p>Stay updated with real-time cryptocurrency prices and track your portfolio.</p>

        <SearchBar setCoins={setCoins} allCoins={allCoins} />
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