import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { searchCoins } from '../../../services/coinGeckoApi'
import './SearchBar.css'

const SearchBar = ({ setCoins, allCoins }) => {

  const [query, setQuery] = useState("")

  useEffect(() => {

    const delay = setTimeout(async () => {

      if (!query) {
        setCoins(allCoins)  
        return
      }

      const results = await searchCoins(query)

      setCoins(results || [])

    }, 500)

    return () => clearTimeout(delay)

  }, [query, allCoins, setCoins])

  return (

    <div className="input-wrapper">

      <input
        type="text"
        placeholder="Type Coin Symbols..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="button">
        <FiSearch />
      </button>

    </div>

  )
}

export default SearchBar