import type { MarketData } from "@/types/market"

export const marketData: MarketData = {
  indices: {
    sp500: { value: 4892.37, change: +1.2, status: "up" },
    nasdaq: { value: 15982.21, change: +1.8, status: "up" },
    dowJones: { value: 38654.42, change: +0.9, status: "up" },
    russell2000: { value: 2042.57, change: -0.4, status: "down" },
  },
  sectors: {
    technology: { performance: +2.4, outlook: "positive", volatility: "medium" },
    healthcare: { performance: +1.1, outlook: "stable", volatility: "low" },
    financials: { performance: +0.7, outlook: "stable", volatility: "medium" },
    energy: { performance: -1.2, outlook: "negative", volatility: "high" },
    utilities: { performance: -0.5, outlook: "neutral", volatility: "low" },
  },
  interestRates: {
    tenYearTreasury: 3.85,
    thirtyYearTreasury: 4.12,
    fedFundsRate: 5.25,
    trend: "stable",
  },
  commodities: {
    gold: { value: 2032.45, change: +0.8 },
    oil: { value: 78.24, change: -1.2 },
    naturalGas: { value: 2.14, change: -2.5 },
  },
  currencies: {
    eurusd: { value: 1.0842, change: +0.3 },
    usdjpy: { value: 148.52, change: -0.5 },
    gbpusd: { value: 1.2654, change: +0.2 },
  },
  volatilityIndex: {
    vix: 14.2,
    status: "low",
    trend: "decreasing",
  },
}

