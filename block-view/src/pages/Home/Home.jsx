import React from 'react'
import SearchBar from '../../components/homecomp/SearchBar/SearchBar'
import CoinTable from '../../components/homecomp/CoinTable/CoinTable'
import coins from '../../data/coins'
import './Home.css'

const Home = () => {
  return (
    <div className="homePage">
        <div className="hero">
            <h1>Track Cryptocurrency Prices</h1>
            <p>Stay updated with real-time cryptocurrency prices and track your portfolio.</p>
            <SearchBar />
        </div>
        <CoinTable coins={coins}/>
    </div>
  )
}

export default Home
