import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from "react-icons/fi"
import "./Navbar.css"

const Navbar = () => {

    const [open, setOpen] = useState(false)

    return (
        <nav className='navbar'>

            <h2 className='logo'><Link to='/'>Block View</Link></h2>

            <div className="hamburger" onClick={() => setOpen(!open)}>
                {open ? <FiX /> : <FiMenu />}
            </div>

            <ul className={`nav-links ${open ? "active" : ""}`}>

                <li><Link to='/' onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link to='/dashboard' onClick={() => setOpen(false)}>Dashboard</Link></li>
                <li><Link to='/watchlist' onClick={() => setOpen(false)}>Watchlist</Link></li>
                <li><Link to='/login' onClick={() => setOpen(false)}>Login</Link></li>
                <li><Link to='/signup' onClick={() => setOpen(false)}>SignUp</Link></li>

            </ul>

        </nav>
    )
}

export default Navbar