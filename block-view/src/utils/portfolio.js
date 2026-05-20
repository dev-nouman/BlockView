const PORTFOLIO_KEY = "portfolio"

export const getPortfolio = () => {
  return JSON.parse(localStorage.getItem(PORTFOLIO_KEY)) || []
}

export const savePortfolio = (data) => {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(data))
}