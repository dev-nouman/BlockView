import React from 'react'
import Navbar from './components/commoncomp/Navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import { PortfolioProvider } from './context/PortfolioContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <Navbar />
          <AppRoutes />
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App