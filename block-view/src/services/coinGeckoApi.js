import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getTopCoins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const searchCoins = async (query) => {
  try {

    const searchRes = await axios.get(
      `${BASE_URL}/search`,
      { params: { query } }
    )

    const coins = searchRes.data.coins.slice(0, 10)

    const ids = coins.map(c => c.id).join(",")

    if (!ids) return []

    const marketRes = await axios.get(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          ids
        }
      }
    )

    return marketRes.data

  } catch (err) {
    console.log(err)
    return []
  }
}