"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowUp,
  BarChart3,
  Bell,
  Calendar,
  DollarSign,
  FileText,
  LineChart,
  Maximize2,
  Menu,
  PieChart,
  Settings,
  ShieldAlert,
  TrendingUp,
  User,
  Users,
  ChevronDown,
  X,
  Sparkles,
  Sun,
  Moon,
  Minimize2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useIsMobile } from "@/hooks/use-mobile"
import { Chart } from "@/components/ui/chart"

// Mock client data
const clients = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/placeholder-user.jpg",
    initials: "JD",
    email: "john.doe@example.com",
    dateOfBirth: "1971-05-12",
    age: 52,
    maritalStatus: "Married",
    riskProfile: "Moderate",
    lastContact: "2023-03-15",
    additionalInfo: "Has 2 children in college. Interested in sustainable investments. Planning early retirement.",
    aum: "$1.2M",
    performance: {
      ytd: "+9.4%",
      oneYear: "+12.7%",
      threeYear: "+32.5%",
      fiveYear: "+48.2%",
    },
    portfolio: {
      equities: 45,
      fixedIncome: 30,
      alternatives: 15,
      cash: 10,
    },
    sectors: {
      technology: 22,
      healthcare: 18,
      financials: 15,
      consumerDiscretionary: 12,
      industrials: 10,
      other: 23,
    },
    recentActivity: "Requested portfolio review 2 days ago",
    concerns: ["Retirement planning", "College funding", "Estate planning"],
    opportunities: ["Tax-loss harvesting", "Roth conversion", "Sector rebalancing"],
    retirementGoal: "$2.5M",
    retirementProgress: 68,
    retirementAge: 65,
    currentAge: 52,
    taxBracket: "32%",
    taxSavingsOpportunity: "$24,500",
    upcomingEvents: [
      { date: "Apr 15, 2023", title: "Portfolio Review" },
      { date: "May 10, 2023", title: "Tax Planning Session" },
      { date: "Jun 22, 2023", title: "Estate Planning Review" },
    ],
  },
  {
    id: "2",
    name: "Alice Smith",
    avatar: "/placeholder-user.jpg",
    initials: "AS",
    email: "alice.smith@example.com",
    dateOfBirth: "1963-09-24",
    age: 60,
    maritalStatus: "Divorced",
    riskProfile: "Conservative",
    lastContact: "2023-03-28",
    additionalInfo: "Planning to retire in 2 years. Focused on income generation and wealth preservation.",
    aum: "$2.8M",
    performance: {
      ytd: "+5.2%",
      oneYear: "+8.1%",
      threeYear: "+18.4%",
      fiveYear: "+26.9%",
    },
    portfolio: {
      equities: 35,
      fixedIncome: 45,
      alternatives: 10,
      cash: 10,
    },
    sectors: {
      technology: 12,
      healthcare: 15,
      financials: 18,
      consumerDiscretionary: 8,
      industrials: 9,
      other: 38,
    },
    recentActivity: "Updated risk profile last week",
    concerns: ["Retirement income", "Healthcare costs", "Estate planning"],
    opportunities: ["Bond ladder strategy", "Roth conversion", "Dividend focus"],
    retirementGoal: "$3M",
    retirementProgress: 85,
    retirementAge: 62,
    currentAge: 60,
    taxBracket: "35%",
    taxSavingsOpportunity: "$32,800",
    upcomingEvents: [
      { date: "Apr 22, 2023", title: "Retirement Planning" },
      { date: "May 17, 2023", title: "Estate Review" },
    ],
  },
  {
    id: "3",
    name: "Robert Johnson",
    avatar: "/placeholder-user.jpg",
    initials: "RJ",
    email: "robert.j@example.com",
    dateOfBirth: "1985-11-18",
    age: 38,
    maritalStatus: "Married",
    riskProfile: "Aggressive",
    lastContact: "2023-04-02",
    additionalInfo: "Business owner. Interested in growth and alternative investments. Planning for succession.",
    aum: "$3.5M",
    performance: {
      ytd: "+11.2%",
      oneYear: "+16.8%",
      threeYear: "+42.1%",
      fiveYear: "+65.3%",
    },
    portfolio: {
      equities: 65,
      fixedIncome: 15,
      alternatives: 15,
      cash: 5,
    },
    sectors: {
      technology: 28,
      healthcare: 15,
      financials: 12,
      consumerDiscretionary: 18,
      industrials: 14,
      other: 13,
    },
    recentActivity: "Inquired about private equity investments",
    concerns: ["Business succession", "Tax minimization", "Wealth growth"],
    opportunities: ["Private equity", "Tax-advantaged accounts", "International expansion"],
    retirementGoal: "$5M",
    retirementProgress: 45,
    retirementAge: 55,
    currentAge: 38,
    taxBracket: "37%",
    taxSavingsOpportunity: "$58,200",
    upcomingEvents: [
      { date: "Apr 28, 2023", title: "Investment Review" },
      { date: "Jun 12, 2023", title: "Tax Planning" },
    ],
  },
]

// Mock market data (simulating SIX financial data)
const marketData = {
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

// Message types
type MessageType = "user" | "ai" | "insight" | "action" | "chart" | "preset"

interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
  clientId?: string
  insightType?: "portfolio" | "risk" | "tax" | "client" | "market"
  actions?: { label: string; action: string }[]
  chartData?: any
  presetType?: "brief" | "quarterly" | "specific"
}

export default function WealthAIDashboard() {
  const isMobile = useIsMobile()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [enlargedBox, setEnlargedBox] = useState<string | null>(null)
  const [clientSearchQuery, setClientSearchQuery] = useState("")

  // Moved inside component: client selection state
  const [selectedClientId, setSelectedClientId] = useState("1")
  const clientData = clients.find((client) => client.id === selectedClientId) || clients[0]

  // Moved inside component: client selection handler
  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleEnlargeBox = (boxId: string | null) => {
    setEnlargedBox(enlargedBox === boxId ? null : boxId)
  }

  const handleActionButtonClick = (prompt: string) => {
    setInputValue(prompt)
    setShowAIChat(true)
    setTimeout(() => {
      handleSubmitMessage()
    }, 100)
  }

  const filteredClients = clients
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(client =>
      clientSearchQuery === "" ||
      client.name.toLowerCase().includes(clientSearchQuery.toLowerCase())
    )

  // Initialize AI chat with welcome message
  useEffect(() => {
    if (showAIChat && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "ai",
          content: `Hello, I'm your WealthAI assistant. I can help you analyze ${clientData.name}'s portfolio, risk profile, tax situation, or retirement planning. Choose a preset below or ask me anything specific.`,
          timestamp: new Date(),
        },
      ])
    }
  }, [showAIChat, clientData.name, messages.length])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle message submission
  const handleSubmitMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      clientId: clientData.id,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      generateAIResponse(userMessage)
      setIsLoading(false)
    }, 1500)
  }

  // Update the preset selection UI and functionality

  // First, add new state variables to track the preset selection process
  const [selectedMainPreset, setSelectedMainPreset] = useState<string | null>(null);
  const [showRefinedPresets, setShowRefinedPresets] = useState(false);

  // Update the handlePresetSelect function to handle the two-step process
  const handleMainPresetSelect = (presetType: string) => {
    setSelectedMainPreset(presetType);
    setShowRefinedPresets(true);
  };

  const handleRefinedPresetSelect = (refinedPreset: string) => {
    let presetContent = "";
    
    // Construct the prompt based on the main preset and refined preset
    if (selectedMainPreset === "brief") {
      if (refinedPreset === "financial") {
        presetContent = `Give me a short financial review for ${clientData.name}`;
      } else if (refinedPreset === "risk") {
        presetContent = `Provide a risk assessment for ${clientData.name}'s portfolio`;
      } else if (refinedPreset === "alerts") {
        presetContent = `What are the key alerts I should be aware of for ${clientData.name}?`;
      } else if (refinedPreset === "market") {
        presetContent = `Summarize recent market shifts affecting ${clientData.name}'s portfolio`;
      } else if (refinedPreset === "performance") {
        presetContent = `Give me a portfolio performance summary for ${clientData.name}`;
      }
    } else if (selectedMainPreset === "update") {
      if (refinedPreset === "financial") {
        presetContent = `Provide a comprehensive financial review for ${clientData.name}`;
      } else if (refinedPreset === "downturn") {
        presetContent = `How would a market downturn affect ${clientData.name}'s portfolio?`;
      }
    } else if (selectedMainPreset === "prepare") {
      if (refinedPreset === "meeting") {
        presetContent = `Help me prepare for a potential meeting with ${clientData.name}`;
      } else if (refinedPreset === "call") {
        presetContent = `Prepare me for a call with ${clientData.name}`;
      } else if (refinedPreset === "points") {
        presetContent = `What are the key points to discuss with ${clientData.name}?`;
      } else if (refinedPreset === "questions") {
        presetContent = `What questions might ${clientData.name} ask in our next meeting?`;
      }
    }

    const presetMessage: Message = {
      id: Date.now().toString(),
      type: "preset",
      content: presetContent,
      timestamp: new Date(),
      clientId: clientData.id,
      presetType: selectedMainPreset as any,
    };

    setMessages((prev) => [...prev, presetMessage]);
    setIsLoading(true);
    setShowRefinedPresets(false);
    setSelectedMainPreset(null);

    // Simulate AI response
    setTimeout(() => {
      generatePresetResponse(presetMessage);
      setIsLoading(false);
    }, 1500);
  };

  const resetPresetSelection = () => {
    setShowRefinedPresets(false);
    setSelectedMainPreset(null);
  };

  // Generate AI response based on preset
  const generatePresetResponse = (presetMessage: Message) => {
    switch (presetMessage.presetType) {
      case "brief":
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "client",
            content: `
# Brief Overview for ${clientData.name}

## Key Financial Metrics
- **AUM**: ${clientData.aum}
- **YTD Performance**: ${clientData.performance.ytd}
- **Risk Profile**: ${clientData.riskProfile}
- **Tax Bracket**: ${clientData.taxBracket}

## Portfolio Allocation
- Equities: ${clientData.portfolio.equities}%
- Fixed Income: ${clientData.portfolio.fixedIncome}%
- Alternatives: ${clientData.portfolio.alternatives}%
- Cash: ${clientData.portfolio.cash}%

## Priority Actions
1. ${clientData.opportunities[0]}
2. Portfolio rebalancing needed (tech sector overweight by 7%)
3. Next meeting scheduled for ${clientData.upcomingEvents[0].date} (${clientData.upcomingEvents[0].title})

Would you like me to elaborate on any specific aspect of this overview?`,
            timestamp: new Date(),
            clientId: clientData.id,
          },
        ])
        break

      case "quarterly":
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "portfolio",
            content: `
# Quarterly Review for ${clientData.name}

## Performance Summary
- **Current Quarter**: ${clientData.performance.ytd}
- **YTD Performance**: ${clientData.performance.ytd}
- **1-Year Performance**: ${clientData.performance.oneYear}
- **3-Year Performance**: ${clientData.performance.threeYear}
- **Benchmark Comparison**: Outperforming by 2.2%

## Portfolio Changes
- Increased technology allocation by 3.5% (now ${clientData.sectors.technology}%)
- Reduced fixed income exposure by 2.1% (now ${clientData.portfolio.fixedIncome}%)
- Added exposure to healthcare innovation (2.8%)

## Tax Considerations
- Realized gains: $78,500 YTD
- Tax-loss harvesting opportunities: ${clientData.taxSavingsOpportunity}
- Recommended actions: ${clientData.opportunities[0]}

## Retirement Progress
- Current progress: ${clientData.retirementProgress}% of goal (${clientData.retirementGoal})
- On track for target retirement age of ${clientData.retirementAge}

## Recommended Discussion Topics
1. Portfolio rebalancing strategy
2. Tax planning for year-end
3. Review of retirement contribution rates

Would you like me to generate a detailed report for any of these sections?`,
            timestamp: new Date(),
            clientId: clientData.id,
          },
        ])
        break

      case "specific":
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "action",
            content: `
# 30-Day Action Plan for ${clientData.name}

## Immediate Actions (Next 7 Days)
1. **Portfolio Rebalancing**
   - Reduce technology sector exposure by 7%
   - Increase healthcare allocation by 3%
   - Adjust fixed income duration (current duration too long for rising rate environment)

2. **Tax Planning**
   - Execute tax-loss harvesting on identified positions (potential savings: ${clientData.taxSavingsOpportunity})
   - Review year-end charitable giving strategy

## Short-Term Actions (8-30 Days)
1. **Client Meeting Preparation**
   - Prepare for ${clientData.upcomingEvents[0].title} on ${clientData.upcomingEvents[0].date}
   - Generate retirement projection scenarios
   - Update risk tolerance assessment

2. **Portfolio Optimization**
   - Review international exposure (currently underweight)
   - Analyze alternative investment opportunities
   - Evaluate cash position (currently ${clientData.portfolio.cash}%)

3. **Documentation Updates**
   - Update investment policy statement
   - Review estate planning documents
   - Refresh financial plan projections

Would you like me to prioritize any of these actions or create a detailed implementation plan?`,
            timestamp: new Date(),
            clientId: clientData.id,
          },
        ])
        break
    }
  }

  // Generate AI response based on user message
  const generateAIResponse = (userMessage: Message) => {
    const query = userMessage.content.toLowerCase()

    // Portfolio-related queries
    if (query.includes("portfolio") || query.includes("allocation") || query.includes("assets")) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "insight",
          insightType: "portfolio",
          content: `${clientData.name}'s portfolio is currently allocated as follows: ${clientData.portfolio.equities}% equities, ${clientData.portfolio.fixedIncome}% fixed income, ${clientData.portfolio.alternatives}% alternatives, and ${clientData.portfolio.cash}% cash.`,
          timestamp: new Date(),
          clientId: clientData.id,
          actions: [
            { label: "View Full Portfolio", action: "viewPortfolio" },
            { label: "Generate Rebalancing Plan", action: "rebalance" },
          ],
        },
      ])
      return
    }

    // Risk-related queries
    if (query.includes("risk") || query.includes("volatility") || query.includes("exposure")) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "insight",
          insightType: "risk",
          content: `${clientData.name} has a ${clientData.riskProfile.toLowerCase()} risk profile. Based on recent market conditions, I've identified potential concerns in their technology sector exposure, which represents ${clientData.sectors.technology}% of their equity allocation.`,
          timestamp: new Date(),
          clientId: clientData.id,
          actions: [
            { label: "View Risk Analysis", action: "viewRisk" },
            { label: "Generate Hedging Strategy", action: "hedge" },
          ],
        },
      ])
      return
    }

    // Tax-related queries
    if (query.includes("tax") || query.includes("harvesting") || query.includes("optimization")) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "insight",
          insightType: "tax",
          content: `I've identified tax-loss harvesting opportunities for ${clientData.name} that could save approximately ${clientData.taxSavingsOpportunity} in taxes this year. There are 3 positions that could be sold and replaced with similar investments to maintain market exposure while capturing losses.`,
          timestamp: new Date(),
          clientId: clientData.id,
          actions: [
            { label: "View Tax Opportunities", action: "viewTax" },
            { label: "Generate Tax Report", action: "taxReport" },
          ],
        },
      ])
      return
    }

    // Retirement-related queries
    if (query.includes("retirement") || query.includes("retire")) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "insight",
          insightType: "client",
          content: `${clientData.name} is currently ${clientData.currentAge} years old and plans to retire at ${clientData.retirementAge}. The retirement goal is ${clientData.retirementGoal}, and current progress is at ${clientData.retirementProgress}%. Based on current savings rate and investment performance, the client is on track to meet their retirement goal.`,
          timestamp: new Date(),
          clientId: clientData.id,
          actions: [
            { label: "View Retirement Plan", action: "viewRetirementPlan" },
            { label: "Adjust Retirement Goals", action: "adjustRetirementGoals" },
          ],
        },
      ])
      return
    }

    // Market-related queries
    if (query.includes("market") || query.includes("economy") || query.includes("outlook")) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "insight",
          insightType: "market",
          content: `Current market conditions show the S&P 500 at ${marketData.indices.sp500.value} (${marketData.indices.sp500.change > 0 ? "+" : ""}${marketData.indices.sp500.change}%). The technology sector is showing ${marketData.sectors.technology.performance > 0 ? "positive" : "negative"} performance at ${marketData.sectors.technology.performance > 0 ? "+" : ""}${marketData.sectors.technology.performance}% with a ${marketData.sectors.technology.outlook} outlook. Market volatility (VIX) is currently at ${marketData.volatilityIndex.vix}, which is considered ${marketData.volatilityIndex.status}.`,
          timestamp: new Date(),
          clientId: clientData.id,
          actions: [
            { label: "View Market Analysis", action: "viewMarketAnalysis" },
            { label: "Generate Market Report", action: "generateMarketReport" },
          ],
        },
      ])
      return
    }

    // Default response
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "ai",
        content: `I can help you analyze ${clientData.name}'s portfolio, risk profile, tax situation, or retirement planning. What specific aspect would you like to explore?`,
        timestamp: new Date(),
        clientId: clientData.id,
      },
    ])
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Toggle AI chat view
  const toggleAIChat = () => {
    setShowAIChat(!showAIChat)
  }

  // Handle action button click
  const handleActionClick = (action: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "action",
        content: `Executing action: ${action}`,
        timestamp: new Date(),
      },
    ])

    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      // Generate response based on action
      if (action === "viewPortfolio" || action === "rebalance") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "chart",
            content: `Here's ${clientData.name}'s current portfolio allocation:`,
            timestamp: new Date(),
            clientId: clientData.id,
            chartData: {
              labels: ["Equities", "Fixed Income", "Alternatives", "Cash"],
              values: [
                clientData.portfolio.equities,
                clientData.portfolio.fixedIncome,
                clientData.portfolio.alternatives,
                clientData.portfolio.cash,
              ],
            },
          },
        ])
      } else if (action.includes("Report")) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content:
              "I've generated the requested report. You can view it now or schedule it to be sent to you via email.",
            timestamp: new Date(),
            actions: [
              { label: "View Report", action: "viewReport" },
              { label: "Email Report", action: "emailReport" },
            ],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content: `I've processed your request to ${action}. Is there anything else you'd like me to help with?`,
            timestamp: new Date(),
          },
        ])
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className={`flex h-screen w-full flex-col bg-background ${theme}`}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-slate-900 px-4 md:px-6 dark:bg-slate-900 light:bg-white light:border-slate-200">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden dark:bg-slate-800 dark:border-slate-700 light:bg-white light:border-slate-200">
              <Menu className="h-5 w-5 dark:text-white light:text-slate-900" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 dark:bg-slate-900 dark:text-white light:bg-white light:text-slate-900">
            <nav className="grid gap-2 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <LineChart className="h-6 w-6" />
                <span className="font-bold">WealthAI</span>
              </a>
              <Separator className="my-2 dark:bg-slate-800 light:bg-slate-200" />
              <a href="#" className="flex items-center gap-3 rounded-lg dark:bg-slate-800 light:bg-slate-100 px-3 py-2 text-primary">
                <User className="h-5 w-5" />
                Client Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <Users className="h-5 w-5" />
                All Clients
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <PieChart className="h-5 w-5" />
                Portfolios
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <ShieldAlert className="h-5 w-5" />
                Risk Management
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <DollarSign className="h-5 w-5" />
                Tax Planning
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <FileText className="h-5 w-5" />
                Reports
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="#" className="flex items-center gap-2 md:ml-0">
          <LineChart className="h-6 w-6 dark:text-white light:text-slate-900" />
          <span className="font-bold hidden md:inline-block dark:text-white light:text-slate-900">WealthAI</span>
        </a>

        {/* Full-width AI search bar */}
        <div className="flex-1 px-2">
          <div
            className="relative w-full cursor-pointer"
            onClick={toggleAIChat}
          >
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <div className="w-full rounded-lg dark:bg-slate-800 dark:border-slate-700 light:bg-slate-100 light:border-slate-200 border py-2 pl-10 pr-4 dark:text-white light:text-slate-900">
                Ask WealthAI anything about {clientData.name}...
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] bg-purple-500">
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:hover:bg-slate-100"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>WM</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:text-white dark:border-slate-700 light:bg-white light:text-slate-900 light:border-slate-200">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-700 light:bg-slate-200" />
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Profile</DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Settings</DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Help</DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-700 light:bg-slate-200" />
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Full-screen AI chat overlay */}
      {showAIChat && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-white">
          <div className="flex items-center justify-between border-b border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold">WealthAI Assistant</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleAIChat} className="text-white hover:bg-slate-800">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 ${message.type === "user" || message.type === "preset" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block rounded-lg px-4 py-3 text-sm max-w-[80%] ${
                    message.type === "user" || message.type === "preset"
                      ? "bg-purple-600 text-white"
                      : message.type === "insight"
                        ? "bg-slate-800 border border-slate-700"
                        : "bg-slate-800"
                  }`}
                >
                  {message.type === "insight" && message.insightType && (
                    <div className="flex items-center gap-2 mb-2">
                      {message.insightType === "portfolio" && <PieChart className="h-4 w-4 text-purple-400" />}
                      {message.insightType === "risk" && <ShieldAlert className="h-4 w-4 text-amber-500" />}
                      {message.insightType === "tax" && <DollarSign className="h-4 w-4 text-emerald-500" />}
                      {message.insightType === "client" && <User className="h-4 w-4 text-blue-500" />}
                      {message.insightType === "market" && <TrendingUp className="h-4 w-4 text-purple-400" />}
                      {message.insightType === "action" && <Calendar className="h-4 w-4 text-orange-500" />}
                      <span className="font-medium">
                        {message.insightType === "portfolio" && "Portfolio Insight"}
                        {message.insightType === "risk" && "Risk Analysis"}
                        {message.insightType === "tax" && "Tax Opportunity"}
                        {message.insightType === "client" && "Client Insight"}
                        {message.insightType === "market" && "Market Analysis"}
                        {message.insightType === "action" && "Action Plan"}
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">{message.content}</div>

                  {message.chartData && (
                    <div className="mt-4 h-64 w-full rounded-md bg-slate-900 p-4">
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <PieChart className="mx-auto h-24 w-24 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">Portfolio Allocation Chart</p>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {message.chartData.labels.map((label: string, index: number) => (
                              <div key={label} className="flex items-center gap-1 text-xs">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    index === 0
                                      ? "bg-purple-500"
                                      : index === 1
                                        ? "bg-blue-500"
                                        : index === 2
                                          ? "bg-amber-500"
                                          : "bg-emerald-500"
                                  }`}
                                ></div>
                                <span>
                                  {label}: {message.chartData.values[index]}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action) => (
                        <Button
                          key={action.action}
                          size="sm"
                          variant={action.action.includes("view") ? "outline" : "default"}
                          onClick={() => handleActionClick(action.action)}
                          className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="mt-1 text-right text-xs text-muted-foreground">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
{messages.length > 1 && (
  <div className="mb-6 flex justify-center">
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        setMessages([messages[0]]);
        resetPresetSelection();
      }}
      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
    >
      <ArrowUp className="h-4 w-4 mr-2" />
      Start Over
    </Button>
  </div>
)}

            {/* Preset options - only show if no messages or just welcome message */}
            {messages.length <= 1 && !showRefinedPresets && (
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={() => handleMainPresetSelect("brief")}
                >
                  <span className="text-lg font-medium">Brief</span>
                  <span className="text-xs text-slate-400 mt-1">Quick client insights</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={() => handleMainPresetSelect("update")}
                >
                  <span className="text-lg font-medium">Update</span>
                  <span className="text-xs text-slate-400 mt-1">Comprehensive review</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={() => handleMainPresetSelect("prepare")}
                >
                  <span className="text-lg font-medium">Prepare</span>
                  <span className="text-xs text-slate-400 mt-1">Meeting preparation</span>
                </Button>
              </div>
            )}

            {/* Refined preset options - show after selecting a main preset */}
            {showRefinedPresets && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">
                    {selectedMainPreset === "brief" && "Brief Options"}
                    {selectedMainPreset === "update" && "Update Options"}
                    {selectedMainPreset === "prepare" && "Preparation Options"}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetPresetSelection}
                    className="text-slate-400 hover:text-white"
                  >
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Back to Categories
                  </Button>
                </div>
                
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {selectedMainPreset === "brief" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("financial")}
                      >
                        <span className="font-medium">Short Financial Review</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("risk")}
                      >
                        <span className="font-medium">Risk Assessment</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("alerts")}
                      >
                        <span className="font-medium">Key Alerts</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("market")}
                      >
                        <span className="font-medium">Market Shifts</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("performance")}
                      >
                        <span className="font-medium">Portfolio Performance</span>
                      </Button>
                    </>
                  )}
                  
                  {selectedMainPreset === "update" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("financial")}
                      >
                        <span className="font-medium">Financial Review</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("downturn")}
                      >
                        <span className="font-medium">Downturn Analysis</span>
                      </Button>
                    </>
                  )}
                  
                  {selectedMainPreset === "prepare" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("meeting")}
                      >
                        <span className="font-medium">Potential Meeting</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("call")}
                      >
                        <span className="font-medium">Call Preparation</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("points")}
                      >
                        <span className="font-medium">Discussion Points</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                        onClick={() => handleRefinedPresetSelect("questions")}
                      >
                        <span className="font-medium">Anticipated Questions</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-700 p-4">
            <div className="relative mx-auto max-w-4xl">
              <Input
                type="text"
                placeholder="Ask anything about this client..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitMessage()
                  }
                }}
                className="pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-purple-400 hover:bg-slate-700 hover:text-purple-300"
                onClick={handleSubmitMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <ArrowUp className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden bg-slate-950">
        {/* Sidebar */}
        <aside className="hidden w-[280px] flex-col border-r border-slate-800 bg-slate-900 md:flex">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100">
                    <span>Clients</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[280px] dark:bg-slate-800 dark:border-slate-700 dark:text-white light:bg-white light:text-slate-900 light:border-slate-200">
                  <div className="p-2">
                    <Input
                      placeholder="Search clients..."
                      value={clientSearchQuery}
                      onChange={(e) => setClientSearchQuery(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-white light:bg-white light:border-slate-200 light:text-slate-900"
                    />
                  </div>
                  <DropdownMenuSeparator className="dark:bg-slate-700 light:bg-slate-200" />
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredClients.map((client) => (
                      <DropdownMenuItem
                        key={client.id}
                        onClick={() => handleClientChange(client.id)}
                        className={`${selectedClientId === client.id ? "dark:bg-slate-700 light:bg-slate-100" : ""} dark:hover:bg-slate-700 light:hover:bg-slate-100`}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={client.avatar} alt={client.name} />
                            <AvatarFallback>{client.initials}</AvatarFallback>
                          </Avatar>
                          {client.name}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={clientData.avatar} alt={clientData.name} />
                  <AvatarFallback>{clientData.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold text-white">{clientData.name}</h2>
                  <p className="text-sm text-slate-400">{clientData.email}</p>
                </div>
              </div>

              <Separator className="my-3 bg-slate-800" />

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-slate-400">Date of Birth:</div>
                  <div className="text-white">
                    {new Date(clientData.dateOfBirth).toLocaleDateString()} ({clientData.age})
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-slate-400">Marital Status:</div>
                  <div className="text-white">{clientData.maritalStatus}</div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-slate-400">Risk Profile:</div>
                  <div className="text-white">{clientData.riskProfile}</div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-slate-400">Last Contact:</div>
                  <div className="text-white">{new Date(clientData.lastContact).toLocaleDateString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-slate-400">AUM:</div>
                  <div className="text-white">{clientData.aum}</div>
                </div>

                <Separator className="my-1 bg-slate-800" />

                <div className="text-sm">
                  <div className="text-slate-400 mb-1">Additional Information:</div>
                  <div className="text-xs text-white">{clientData.additionalInfo}</div>
                </div>
              </div>
            </div>

            <Separator className="my-4 bg-slate-800" />

            <nav className="grid gap-2 text-sm">
              <Button
                variant={activeTab === "insights" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "insights" ? "bg-purple-900 text-white hover:bg-purple-800" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("insights")}
              >
                <LineChart className="mr-2 h-4 w-4" />
                AI Insights
              </Button>
              <Button
                variant={activeTab === "portfolio" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "portfolio" ? "bg-purple-900 text-white hover:bg-purple-800" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("portfolio")}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
              <Button
                variant={activeTab === "risk" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "risk" ? "bg-purple-900 text-white hover:bg-purple-800" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("risk")}
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                Risk Management
              </Button>
              <Button
                variant={activeTab === "tax" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "tax" ? "bg-purple-900 text-white hover:bg-purple-800" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("tax")}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Tax Planning
              </Button>
              <Button
                variant={activeTab === "retirement" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "retirement" ? "bg-purple-900 text-white hover:bg-purple-800" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("retirement")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Retirement
              </Button>
              <Button
                variant={activeTab === "market" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "market" ? "bg-purple-900 text-white hover:bg-purple-800" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("market")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Market Insights
              </Button>
            </nav>
          </div>
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Client header for mobile */}
            <div className="md:hidden p-4 border-b border-slate-800">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between mb-2 bg-slate-800 border-slate-700 text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={clientData.avatar} alt={clientData.name} />
                        <AvatarFallback>{clientData.initials}</AvatarFallback>
                      </Avatar>
                      <span>{clientData.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] bg-slate-800 border-slate-700 text-white">
                  <DropdownMenuLabel>Select Client</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  {clients.map((client) => (
                    <DropdownMenuItem
                      key={client.id}
                      onClick={() => handleClientChange(client.id)}
                      className={`${selectedClientId === client.id ? "bg-slate-700" : ""} hover:bg-slate-700`}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        {client.name}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Age:</div>
                    <div className="text-white">{clientData.age}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Status:</div>
                    <div className="text-white">{clientData.maritalStatus}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Risk:</div>
                    <div className="text-white">{clientData.riskProfile}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Last Contact:</div>
                    <div className="text-white">{new Date(clientData.lastContact).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden p-2 border-b border-slate-800 bg-slate-900">
              <Tabs defaultValue="insights" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full bg-slate-800">
                  <TabsTrigger value="insights" className="data-[state=active]:bg-purple-900">
                    Insights
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-900">
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger value="market" className="data-[state=active]:bg-purple-900">
                    Market
                  </TabsList>
              </Tabs>
            </div>

            {/* Main content area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Client Insights</h1>
                  <p className="text-slate-400">
                    AI-powered insights for {clientData.name} based on financial data and market conditions
                  </p>
                </div>
              </div>

              {/* New fixed row with three boxes - darker styling */}
              <div className="grid gap-4 mb-6 md:grid-cols-3">
                {/* Box 1: Detailed Customer Info */}
                <Card className="dark:bg-slate-900 dark:border-slate-800 light:bg-white light:border-slate-200 text-white shadow-md">
                  <CardHeader className="pb-2 dark:border-b dark:border-slate-800 light:border-b light:border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base dark:text-white light:text-slate-900">Detailed Customer Info</CardTitle>
                        <CardDescription className="dark:text-slate-400 light:text-slate-500">Comprehensive client profile</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100"
                        onClick={() => toggleEnlargeBox('customerInfo')}
                      >
                        {enlargedBox === 'customerInfo' ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm pt-3 px-3">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1 dark:text-purple-400 light:text-purple-600">Professional Background</h4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <div className="dark:text-slate-400 light:text-slate-500">Occupation:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Senior Executive, Tech Industry" : clientData.id === "2" ? "Retired CFO, Healthcare" : "Business Owner, Manufacturing"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Education:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "MBA, Stanford University" : clientData.id === "2" ? "BS Finance, NYU" : "MS Engineering, MIT"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Industry:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Technology" : clientData.id === "2" ? "Healthcare" : "Manufacturing"}
                          </div>
                        </div>
                      </div>

                      <Separator className="dark:bg-slate-800 light:bg-slate-200" />

                      <div>
                        <h4 className="font-medium mb-1 dark:text-purple-400 light:text-purple-600">Financial Preferences</h4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <div className="dark:text-slate-400 light:text-slate-500">Investment Style:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Growth-oriented" : clientData.id === "2" ? "Income-focused" : "Aggressive growth"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">ESG Preference:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "High priority" : clientData.id === "2" ? "Moderate interest" : "Low priority"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Liquidity Needs:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Medium" : clientData.id === "2" ? "High" : "Low"}
                          </div>
                        </div>
                      </div>

                      <Separator className="dark:bg-slate-800 light:bg-slate-200" />

                      <div>
                        <h4 className="font-medium mb-1 dark:text-purple-400 light:text-purple-600">Communication Preferences</h4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <div className="dark:text-slate-400 light:text-slate-500">Preferred Contact:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Email" : clientData.id === "2" ? "Phone" : "In-person"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Meeting Frequency:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Quarterly" : clientData.id === "2" ? "Monthly" : "Bi-monthly"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Report Detail Level:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Detailed" : clientData.id === "2" ? "Summary" : "Comprehensive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
                      onClick={() => handleActionButtonClick("Generate a comprehensive client profile for " + clientData.name)}
                    >
                      View Full Profile
                    </Button>
                  </CardFooter>
                </Card>

                {/* Box 2: Calendar */}
                <Card className="bg-slate-900 border-slate-800 text-white shadow-md">
                  <CardHeader className="pb-2 border-b border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Calendar</CardTitle>
                        <CardDescription className="text-slate-400">Recent and upcoming interactions</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 px-3">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-purple-400">Recent Interactions</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {new Date(clientData.lastContact).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-400">{clientData.recentActivity}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {new Date(
                                  new Date(clientData.lastContact).setDate(
                                    new Date(clientData.lastContact).getDate() - 14,
                                  ),
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-400">Quarterly portfolio review call</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-slate-800" />

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-purple-400">Upcoming Meetings</h4>
                        <div className="space-y-3">
                          {clientData.upcomingEvents.slice(0, 2).map((event, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-white">{event.date}</p>
                                <p className="text-xs text-slate-400">{event.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
                      onClick={() => handleActionButtonClick("Schedule a meeting with " + clientData.name + " and prepare meeting materials")}
                    >
                      Schedule Meeting
                    </Button>
                  </CardFooter>
                </Card>

                {/* Box 3: AI-recommended Actions */}
                <Card className="bg-slate-900 border-slate-800 text-white shadow-md">
                  <CardHeader className="pb-2 border-b border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">AI-recommended Actions</CardTitle>
                        <CardDescription className="text-slate-400">Suggested next steps</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 px-3">
                    <div className="space-y-3">
                      <div className="rounded-md bg-slate-800 p-3">
                        <h4 className="text-sm font-medium mb-2 text-purple-400">High Priority</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-red-900 flex items-center justify-center">
                              <span className="text-xs font-bold text-red-300">1</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">Portfolio Rebalancing</p>
                              <p className="text-xs text-slate-400">
                                Technology sector overweight by 7% relative to target allocation
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-amber-900 flex items-center justify-center">
                              <span className="text-xs font-bold text-amber-300">2</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">Tax-Loss Harvesting</p>
                              <p className="text-xs text-slate-400">
                                Potential savings of {clientData.taxSavingsOpportunity} before year-end
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-purple-400">Preparation for Next Meeting</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white">Generate retirement projection report</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white">Prepare estate planning discussion materials</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white">Update risk tolerance assessment</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
                      onClick={() => handleActionButtonClick("Execute all recommended actions for " + clientData.name + " and provide implementation details")}
                    >
                      Execute All Actions
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Dynamic insights grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Tile 1: Portfolio Performance */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">How is my portfolio performing?</CardTitle>
                        <CardDescription className="text-slate-400">Performance analysis</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">YTD Performance</span>
                        <span
                          className={`text-sm font-bold ${clientData.performance.ytd.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {clientData.performance.ytd}
                        </span>
                      </div>
                      <Chart
                        type="line"
                        options={{
                          chart: {
                            toolbar: {
                              show: false,
                            },
                            zoom: {
                              enabled: false,
                            },
                            background: "transparent",
                          },
                          xaxis: {
                            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            labels: {
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          yaxis: {
                            labels: {
                              formatter: (value) => `${value}%`,
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          stroke: {
                            curve: "smooth",
                            width: 2,
                          },
                          colors: ["hsl(var(--primary))", "hsl(var(--muted-foreground))"],
                          tooltip: {
                            theme: "dark",
                          },
                          grid: {
                            borderColor: "hsl(var(--border))",
                          },
                          legend: {
                            show: true,
                            position: "bottom",
                          },
                          theme: {
                            mode: "dark",
                          },
                        }}
                        series={[
                          {
                            name: "Portfolio",
                            data: [2.1, 3.5, 5.2, 7.8, 8.9, 9.4],
                          },
                          {
                            name: "Benchmark",
                            data: [1.8, 2.7, 4.1, 5.6, 6.8, 7.2],
                          },
                        ]}
                        height={180}
                      />
                      <div className="text-sm text-slate-400">
                        Your portfolio is outperforming the benchmark by 2.2%. The technology sector has been the main
                        contributor to this performance.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() => handleActionButtonClick("Provide a detailed portfolio performance analysis for " + clientData.name + " including sector breakdown, historical performance, and benchmark comparison")}
                    >
                      View Detailed Analysis
                    </Button>
                  </CardFooter>
                </Card>

                {/* Tile 2: Risk Assessment */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">What's my current risk exposure?</CardTitle>
                        <CardDescription className="text-slate-400">Risk assessment</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Risk Profile</span>
                        <Badge variant="outline" className="bg-slate-700 text-white border-slate-600">
                          {clientData.riskProfile}
                        </Badge>
                      </div>
                      <Chart
                        type="radar"
                        options={{
                          chart: {
                            toolbar: {
                              show: false,
                            },
                            background: "transparent",
                          },
                          xaxis: {
                            categories: ["Market", "Credit", "Liquidity", "Concentration", "Interest Rate"],
                            labels: {
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          yaxis: {
                            show: false,
                          },
                          fill: {
                            opacity: 0.5,
                          },
                          stroke: {
                            width: 2,
                          },
                          markers: {
                            size: 0,
                          },
                          colors: ["hsl(var(--primary))", "hsl(var(--muted-foreground))"],
                          tooltip: {
                            theme: "dark",
                          },
                          theme: {
                            mode: "dark",
                          },
                        }}
                        series={[
                          {
                            name: "Current",
                            data: [65, 40, 35, 70, 45],
                          },
                          {
                            name: "Target",
                            data: [50, 45, 40, 50, 40],
                          },
                        ]}
                        height={180}
                      />
                      <div className="text-sm text-slate-400">
                        Your technology sector concentration (22%) is higher than recommended for your risk profile.
                        Consider rebalancing to reduce this exposure.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() => handleActionButtonClick("Generate a comprehensive risk mitigation plan for " + clientData.name + " addressing all identified risk factors")}
                    >
                      View Risk Mitigation Plan
                    </Button>
                  </CardFooter>
                </Card>

                {/* Tile 3: Tax Optimization */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">How can I reduce my tax burden?</CardTitle>
                        <CardDescription className="text-slate-400">Tax optimization</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Tax Bracket</span>
                        <Badge variant="outline" className="bg-slate-700 text-white border-slate-600">
                          {clientData.taxBracket}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Potential Tax Savings</span>
                          <span className="text-sm font-bold text-emerald-400">{clientData.taxSavingsOpportunity}</span>
                        </div>
                        <Progress value={75} className="h-2 bg-slate-700" />
                        <p className="text-xs text-slate-400">75% of maximum potential savings identified</p>
                      </div>
                      <div className="rounded-md bg-slate-700 p-3">
                        <h4 className="text-sm font-medium mb-1 text-white">Top Opportunities:</h4>
                        <ul className="text-sm space-y-1 text-slate-400">
                          <li className="flex items-center gap-2">
                            <DollarSign className="h-3 w-3 text-emerald-400" />
                            Tax-loss harvesting on underperforming tech positions
                          </li>
                          <li className="flex items-center gap-2">
                            <DollarSign className="h-3 w-3 text-emerald-400" />
                            Roth conversion during lower income year
                          </li>
                          <li className="flex items-center gap-2">
                            <DollarSign className="h-3 w-3 text-emerald-400" />
                            Charitable giving with appreciated securities
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() => handleActionButtonClick("Create a detailed tax optimization strategy for " + clientData.name + " with specific action items and estimated savings")}
                    >
                      Generate Tax Strategy
                    </Button>
                  </CardFooter>
                </Card>

                {/* Tile 4: Retirement Planning */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Am I on track for retirement?</CardTitle>
                        <CardDescription className="text-slate-400">Retirement planning</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Retirement Goal</span>
                        <span className="text-sm font-bold text-white">{clientData.retirementGoal}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Progress</span>
                          <span className="text-sm font-bold text-white">{clientData.retirementProgress}%</span>
                        </div>
                        <Progress value={clientData.retirementProgress} className="h-2 bg-slate-700" />
                        <p className="text-xs text-slate-400">
                          {13} years until target retirement age of {clientData.retirementAge}
                        </p>
                      </div>
                      <Chart
                        type="bar"
                        options={{
                          chart: {
                            toolbar: {
                              show: false,
                            },
                            stacked: true,
                            background: "transparent",
                          },
                          plotOptions: {
                            bar: {
                              horizontal: false,
                            },
                          },
                          xaxis: {
                            categories: ["Current", "Age 60", "Age 65", "Age 70"],
                            labels: {
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          yaxis: {
                            labels: {
                              formatter: (value) => `$${(value / 1000000).toFixed(1)}M`,
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          colors: ["hsl(var(--primary))", "hsl(var(--secondary))"],
                          tooltip: {
                            theme: "dark",
                          },
                          legend: {
                            position: "top",
                          },
                          theme: {
                            mode: "dark",
                          },
                        }}
                        series={[
                          {
                            name: "Current Assets",
                            data: [1.7, 1.7, 1.7, 1.7],
                          },
                          {
                            name: "Projected Growth",
                            data: [0, 0.8, 1.3, 2.1],
                          },
                        ]}
                        height={180}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() => handleActionButtonClick("Analyze and adjust the retirement plan for " + clientData.name + " with multiple scenarios and recommendations")}
                    >
                      Adjust Retirement Plan
                    </Button>
                  </CardFooter>
                </Card>

                {/* Tile 5: Investment Opportunities */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">
                          What investment opportunities should I consider?
                        </CardTitle>
                        <CardDescription className="text-slate-400">Investment recommendations</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md bg-slate-700 p-3">
                        <h4 className="text-sm font-medium mb-1 text-white">Top Opportunities:</h4>
                        <ul className="text-sm space-y-2 text-slate-400">
                          <li className="flex items-start gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-white">Healthcare sector allocation</p>
                              <p>
                                Increase exposure to healthcare innovation funds given positive sector outlook and aging
                                demographics.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-white">Fixed income reallocation</p>
                              <p>
                                Shift from long-term to short/medium-term bonds to reduce interest rate risk in current
                                environment.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-white">Alternative investments</p>
                              <p>
                                Consider 5% allocation to private equity to enhance long-term returns and
                                diversification.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="text-sm text-slate-400">
                        These recommendations are based on your risk profile, financial goals, and current market
                        conditions.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() => handleActionButtonClick("Create a detailed investment plan for " + clientData.name + " with specific allocation recommendations and expected outcomes")}
                    >
                      Generate Investment Plan
                    </Button>
                  </CardFooter>
                </Card>

                {/* Tile 6: Market Insights */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">
                          How are current market conditions affecting me?
                        </CardTitle>
                        <CardDescription className="text-slate-400">Market impact analysis</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-md border border-slate-700 bg-slate-800 p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">S&P 500</span>
                            <span
                              className={`text-xs font-bold ${marketData.indices.sp500.status === "up" ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {marketData.indices.sp500.change > 0 ? "+" : ""}
                              {marketData.indices.sp500.change}%
                            </span>
                          </div>
                          <p className="text-sm font-medium mt-1 text-white">{marketData.indices.sp500.value}</p>
                        </div>
                        <div className="rounded-md border border-slate-700 bg-slate-800 p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">NASDAQ</span>
                            <span
                              className={`text-xs font-bold ${marketData.indices.nasdaq.status === "up" ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {marketData.indices.nasdaq.change > 0 ? "+" : ""}
                              {marketData.indices.nasdaq.change}%
                            </span>
                          </div>
                          <p className="text-sm font-medium mt-1 text-white">{marketData.indices.nasdaq.value}</p>
                        </div>
                        <div className="rounded-md border border-slate-700 bg-slate-800 p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Dow Jones</span>
                            <span
                              className={`text-xs font-bold ${marketData.indices.dowJones.status === "up" ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {marketData.indices.dowJones.change > 0 ? "+" : ""}
                              {marketData.indices.dowJones.change}%
                            </span>
                          </div>
                          <p className="text-sm font-medium mt-1 text-white">{marketData.indices.dowJones.value}</p>
                        </div>
                        <div className="rounded-md border border-slate-700 bg-slate-800 p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Russell 2000</span>
                            <span
                              className={`text-xs font-bold ${marketData.indices.russell2000.status === "up" ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {marketData.indices.russell2000.change > 0 ? "+" : ""}
                              {marketData.indices.russell2000.change}%
                            </span>
                          </div>
                          <p className="text-sm font-medium mt-1 text-white">{marketData.indices.russell2000.value}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 mt-4">
                        Overall, market sentiment is positive, but be cautious of volatility in the energy sector due to
                        recent geopolitical events.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() => handleActionButtonClick("Generate a comprehensive market report with analysis of how current conditions impact " + clientData.name + "'s portfolio")}
                    >
                      Generate Market Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      {enlargedBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg dark:bg-slate-900 dark:border-slate-800 light:bg-white light:border-slate-200 border shadow-xl">
            <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 light:border-slate-200">
              <h2 className="text-xl font-semibold dark:text-white light:text-slate-900">
                {enlargedBox === 'customerInfo' && 'Detailed Customer Information'}
                {enlargedBox === 'calendar' && 'Calendar & Interactions'}
                {enlargedBox === 'actions' && 'AI-recommended Actions'}
                {enlargedBox === 'portfolio' && 'Portfolio Performance'}
                {enlargedBox === 'risk' && 'Risk Assessment'}
                {enlargedBox === 'tax' && 'Tax Optimization'}
                {enlargedBox === 'retirement' && 'Retirement Planning'}
                {enlargedBox === 'investment' && 'Investment Opportunities'}
                {enlargedBox === 'market' && 'Market Insights'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleEnlargeBox(null)}
                className="dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {enlargedBox === 'customerInfo' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={clientData.avatar} alt={clientData.name} />
                      <AvatarFallback className="text-2xl">{clientData.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white light:text-slate-900">{clientData.name}</h3>
                      <p className="text-lg dark:text-slate-400 light:text-slate-500">{clientData.email}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className="dark:bg-purple-900 dark:text-purple-100 light:bg-purple-100 light:text-purple-800">
                          {clientData.riskProfile}
                        </Badge>
                        <Badge className="dark:bg-blue-900 dark:text-blue-100 light:bg-blue-100 light:text-blue-800">
                          AUM: {clientData.aum}
                        </Badge>
                        <Badge className="dark:bg-emerald-900 dark:text-emerald-100 light:bg-emerald-100 light:text-emerald-800">
                          YTD: {clientData.performance.ytd}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold dark:text-purple-400 light:text-purple-600">Professional Background</h4>
                      <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="dark:text-slate-400 light:text-slate-500">Occupation:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Senior Executive, Tech Industry" : clientData.id === "2" ? "Retired CFO, Healthcare" : "Business Owner, Manufacturing"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Education:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "MBA, Stanford University" : clientData.id === "2" ? "BS Finance, NYU" : "MS Engineering, MIT"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Industry:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Technology" : clientData.id === "2" ? "Healthcare" : "Manufacturing"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Years in Industry:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "22" : clientData.id === "2" ? "35" : "15"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Previous Roles:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "CTO, VP Engineering" : clientData.id === "2" ? "Controller, Accounting Manager" : "Operations Director, Project Manager"}
                          </div>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold dark:text-purple-400 light:text-purple-600">Family & Personal</h4>
                      <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="dark:text-slate-400 light:text-slate-500">Marital Status:</div>
                          <div className="dark:text-white light:text-slate-900">{clientData.maritalStatus}</div>
                          <div className="dark:text-slate-400 light:text-slate-500">Children:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "2 (College age)" : clientData.id === "2" ? "3 (Adult)" : "1 (Teenager)"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Hobbies:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Golf, Sailing" : clientData.id === "2" ? "Travel, Reading" : "Mountain Biking, Wine Collecting"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Charitable Interests:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Education, Environment" : clientData.id === "2" ? "Healthcare, Arts" : "Youth Programs, Local Business"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold dark:text-purple-400 light:text-purple-600">Financial Preferences</h4>
                      <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="dark:text-slate-400 light:text-slate-500">Investment Style:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Growth-oriented" : clientData.id === "2" ? "Income-focused" : "Aggressive growth"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Risk Tolerance:</div>
                          <div className="dark:text-white light:text-slate-900">{clientData.riskProfile}</div>
                          <div className="dark:text-slate-400 light:text-slate-500">ESG Preference:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "High priority" : clientData.id === "2" ? "Moderate interest" : "Low priority"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Liquidity Needs:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Medium" : clientData.id === "2" ? "High" : "Low"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Tax Sensitivity:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "High" : clientData.id === "2" ? "Very High" : "Medium"}
                          </div>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold dark:text-purple-400 light:text-purple-600">Communication Preferences</h4>
                      <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="dark:text-slate-400 light:text-slate-500">Preferred Contact:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Email" : clientData.id === "2" ? "Phone" : "In-person"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Meeting Frequency:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Quarterly" : clientData.id === "2" ? "Monthly" : "Bi-monthly"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Report Detail Level:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Detailed" : clientData.id === "2" ? "Summary" : "Comprehensive"}
                          </div>
                          <div className="dark:text-slate-400 light:text-slate-500">Communication Style:</div>
                          <div className="dark:text-white light:text-slate-900">
                            {clientData.id === "1" ? "Data-driven" : clientData.id === "2" ? "Relationship-focused" : "Direct and concise"}
                          </div>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold dark:text-purple-400 light:text-purple-600">Notes & Special Considerations</h4>
                      <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4">
                        <p className="dark:text-white light:text-slate-900">
                          {clientData.id === "1"
                            ? "Client is interested in sustainable investments and planning for early retirement. Has expressed interest in legacy planning for children's education. Prefers detailed performance metrics and regular portfolio reviews."
                            : clientData.id === "2"
                              ? "Client is focused on income generation and wealth preservation. Has health concerns that may impact long-term planning. Interested in charitable giving strategies and estate planning."
                              : "Business owner with succession planning needs. Interested in alternative investments and tax minimization strategies. May need liquidity for business expansion in next 2-3 years."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      className="dark:bg-purple-600 dark:hover:bg-purple-700 light:bg-purple-600 light:hover:bg-purple-700 text-white"
                      onClick={() => handleActionButtonClick("Generate a comprehensive client profile for " + clientData.name)}
                    >
                      Generate Full Profile Report
                    </Button>
                  </div>
                </div>
              )}

              {/* Add similar detailed content for other enlarged boxes */}
              {enlargedBox === 'calendar' && (
                <div className="space-y-6">
                  {/* Calendar detailed view content */}
                </div>
              )}

              {/* Add other enlarged box content as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

