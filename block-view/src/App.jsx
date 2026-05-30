import React from 'react'
import Navbar from './components/commoncomp/Navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import { PortfolioProvider } from './context/PortfolioContext'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Navbar />
        <AppRoutes />
      </PortfolioProvider>
    </AuthProvider>
  )
}

export default App