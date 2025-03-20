export interface MarketData {
  indices: {
    sp500: { value: number; change: number; status: string }
    nasdaq: { value: number; change: number; status: string }
    dowJones: { value: number; change: number; status: string }
    russell2000: { value: number; change: number; status: string }
  }
  sectors: {
    technology: { performance: number; outlook: string; volatility: string }
    healthcare: { performance: number; outlook: string; volatility: string }
    financials: { performance: number; outlook: string; volatility: string }
    energy: { performance: number; outlook: string; volatility: string }
    utilities: { performance: number; outlook: string; volatility: string }
  }
  interestRates: {
    tenYearTreasury: number
    thirtyYearTreasury: number
    fedFundsRate: number
    trend: string
  }
  commodities: {
    gold: { value: number; change: number }
    oil: { value: number; change: number }
    naturalGas: { value: number; change: number }
  }
  currencies: {
    eurusd: { value: number; change: number }
    usdjpy: { value: number; change: number }
    gbpusd: { value: number; change: number }
  }
  volatilityIndex: {
    vix: number
    status: string
    trend: string
  }
}

