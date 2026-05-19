import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
    return (

        <>
            <nav className='navbar'>
                <h2 className='logo'>Block View</h2>
                <ul className="nav-links">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/watchlist'>Watchlist</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar