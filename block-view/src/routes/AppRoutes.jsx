import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import Watchlist from '../pages/Watchlist/Watchlist'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/watchlist' element={<Watchlist />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    )
}

export default AppRoutes
