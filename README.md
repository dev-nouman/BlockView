# BlockView 📊

A sleek, real-time cryptocurrency portfolio tracker built with React. Monitor your holdings, track performance, and export detailed reports — all from a clean, responsive dashboard.

🔗 **Live Demo:** [block-view-n.vercel.app](https://block-view-n.vercel.app)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- **Live Market Data** — Real-time prices from CoinGecko API (top 50 coins by market cap)
- **Portfolio Management** — Add and remove coin holdings with buy price and quantity tracking
- **Dashboard Analytics** — Current value, total investment, P&L, top gainers/losers, and allocation chart
- **Export to CSV** — Download your full portfolio table as a spreadsheet
- **Export to PDF** — Generate a styled PDF report with summary cards and a full holdings table
- **Watchlist** — Save coins to a personal watchlist for quick reference
- **Coin Search** — Search any coin by name with live market data lookup
- **Mock Authentication** — Sign up / Login flow with localStorage-based session persistence
- **Dark / Light Theme** — Toggle between themes with preferences saved across sessions
- **Fully Responsive** — Mobile-friendly layout with hamburger nav

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router DOM v7 |
| Charts | Recharts |
| HTTP | Axios |
| CSV Export | Papaparse |
| PDF Export | jsPDF |
| Icons | React Icons |
| Notifications | React Hot Toast |
| Data Source | CoinGecko Public API |
| State | React Context API |
| Storage | localStorage |
| Deployment | Vercel |

---

## 📁 Project Structure

```
block-view/
├── src/
│   ├── components/
│   │   ├── commoncomp/
│   │   │   ├── Navbar/
│   │   │   ├── Loader/
│   │   │   ├── BuyModal/
│   │   │   ├── RemoveModal/
│   │   │   └── ThemeToggle/
│   │   └── dashboardcomp/
│   │       ├── CurrentValue/
│   │       ├── TotalInvestment/
│   │       ├── PortfolioAllocation/
│   │       ├── GainersLosers/
│   │       ├── PortfolioTable/
│   │       └── ExportButtons/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── PortfolioContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── WatchlistContext.jsx
│   ├── hooks/
│   │   └── usePortfolio.js
│   ├── pages/
│   │   ├── Auth/         (Login, Signup)
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   ├── Watchlist/
│   │   └── CoinDetails/
│   ├── services/
│   │   └── coinGeckoApi.js
│   ├── utils/
│   │   ├── exportCSV.js
│   │   ├── exportPDF.js
│   │   ├── formatCurrency.js
│   │   ├── localStorage.js
│   │   ├── portfolio.js
│   │   └── watchlist.js
│   └── styles/
│       ├── global.css
│       ├── themes.css
│       └── variables.css
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dev-nouman/BlockView.git
cd BlockView/block-view

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📱 Pages

| Route | Description |
|---|---|
| `/` | Home — live market table with search |
| `/dashboard` | Portfolio analytics, charts, and export |
| `/watchlist` | Saved coins |
| `/login` | Login with stored credentials |
| `/signup` | Create a new account |

---

## 📤 Export Reports

### CSV
Exports the full portfolio table as a `.csv` file with columns: Coin, Symbol, Current Price, Investment, Coins Held, Current Value, and P/L %.

### PDF
Generates a landscape A4 PDF featuring:
- Dark header with report title and export timestamp
- Summary cards — Total Investment, Current Value, P/L (color-coded green/red)
- Full holdings table with alternating rows and color-coded P/L column

---

## 🔐 Authentication

BlockView uses a mock auth system backed by `localStorage` — suitable for frontend demos and portfolios. No backend or external auth service is required.

- **Sign Up** — stores credentials in `localStorage`
- **Login** — validates against stored credentials, sets session flag
- **Logout** — clears session, redirects to login
- **Persistent session** — stays logged in on page refresh

> ⚠️ This is a frontend-only mock. Do not store sensitive credentials in a real production environment without a proper auth backend.

---

## 🌐 API

Data is sourced from the [CoinGecko API](https://www.coingecko.com/en/api) (free tier, no API key required).

| Endpoint | Usage |
|---|---|
| `/coins/markets` | Top 50 coins by market cap |
| `/search` | Coin search by name/symbol |

> CoinGecko's free tier has rate limits. If data fails to load, wait a moment and refresh.

---

## 🎨 Theming

BlockView supports light and dark themes via CSS variables defined in `src/styles/themes.css`. The selected theme persists across sessions via `localStorage`.

---

## 📦 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## ☁️ Deployment

This project is deployed on **Vercel** with the following configuration:

| Setting | Value |
|---|---|
| Root Directory | `block-view` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Nouman**
- GitHub: [@dev-nouman](https://github.com/dev-nouman)
- Live Project: [block-view-n.vercel.app](https://block-view-n.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ☕ and React</p>
