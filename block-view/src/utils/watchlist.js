export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
};

export const saveWatchlist = (coins) => {
  localStorage.setItem("watchlist", JSON.stringify(coins));
};