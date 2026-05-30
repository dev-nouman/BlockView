import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from "react-icons/fi"
import { useAuth } from '../../../context/AuthContext'
import "./Navbar.css"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/login')
  }

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
        {isAuthenticated ? (
          <>
            {user?.name && <li className="nav-username">Hi, {user.name.split(" ")[0]}</li>}
            <li><button className="nav-logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to='/login' onClick={() => setOpen(false)}>Login</Link></li>
            <li><Link to='/signup' onClick={() => setOpen(false)}>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar