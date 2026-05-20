import React from 'react'
import { FiSearch } from 'react-icons/fi'
import './SearchBar.css'

const SearchBar = () => {

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("searching");
      
    }

    return (
        
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <input type="text" placeholder='Search for Crypto' />
                    <button type='submit'>
                        <FiSearch />
                    </button>
                </div>
            </form>
        
    )
}

export default SearchBar
