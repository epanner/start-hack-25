export interface Client {
  id: string
  name: string
  avatar: string
  initials: string
  email: string
  dateOfBirth: string
  age: number
  maritalStatus: string
  riskProfile: string
  lastContact: string
  additionalInfo: string
  aum: string
  performance: {
    ytd: string
    oneYear: string
    threeYear: string
    fiveYear: string
  }
  portfolio: {
    equities: number
    fixedIncome: number
    alternatives: number
    cash: number
  }
  sectors: {
    technology: number
    healthcare: number
    financials: number
    consumerDiscretionary: number
    industrials: number
    other: number
  }
  recentActivity: string
  concerns: string[]
  opportunities: string[]
  retirementGoal: string
  retirementProgress: number
  retirementAge: number
  currentAge: number
  taxBracket: string
  taxSavingsOpportunity: string
  upcomingEvents: Array<{ date: string; title: string }>
}

