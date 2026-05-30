import React from 'react'
import Navbar from './components/commoncomp/Navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import { PortfolioProvider } from './context/PortfolioContext'

const App = () => {
  return (
    <PortfolioProvider>
      <Navbar />
      <AppRoutes />
    </PortfolioProvider>
  )
}

export default App
