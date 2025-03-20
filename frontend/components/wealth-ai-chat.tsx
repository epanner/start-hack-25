"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  AlertCircle,
  ArrowUp,
  BarChart3,
  Bell,
  ChevronDown,
  DollarSign,
  FileText,
  LineChart,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  ShieldAlert,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { useIsMobile } from "@/hooks/use-mobile"

// Sample client data
const clients = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/placeholder-user.jpg",
    initials: "JD",
    email: "john.doe@example.com",
    aum: "$1.2M",
    performance: "+9.4%",
    riskProfile: "Moderate",
    nextReview: "Apr 15, 2023",
    insights: [
      { type: "rebalance", label: "Rebalance Needed" },
      { type: "tax", label: "Tax Opportunity" },
    ],
    portfolio: {
      equities: 45,
      fixedIncome: 30,
      alternatives: 15,
      cash: 10,
    },
    recentActivity: "Requested portfolio review 2 days ago",
    concerns: ["Retirement planning", "College funding", "Estate planning"],
    opportunities: ["Tax-loss harvesting", "Roth conversion", "Sector rebalancing"],
  },
  {
    id: "2",
    name: "Alice Smith",
    avatar: "/placeholder-user.jpg",
    initials: "AS",
    email: "alice.smith@example.com",
    aum: "$2.8M",
    performance: "+7.2%",
    riskProfile: "Conservative",
    nextReview: "May 3, 2023",
    insights: [{ type: "tax", label: "Tax Opportunity" }],
    portfolio: {
      equities: 35,
      fixedIncome: 45,
      alternatives: 10,
      cash: 10,
    },
    recentActivity: "Updated risk profile yesterday",
    concerns: ["Wealth preservation", "Income generation", "Philanthropy"],
    opportunities: ["Municipal bond ladder", "Charitable remainder trust", "Dividend strategy"],
  },
  {
    id: "3",
    name: "Robert Johnson",
    avatar: "/placeholder-user.jpg",
    initials: "RJ",
    email: "robert.j@example.com",
    aum: "$3.5M",
    performance: "+10.1%",
    riskProfile: "Aggressive",
    nextReview: "Apr 28, 2023",
    insights: [{ type: "risk", label: "Risk Alert" }],
    portfolio: {
      equities: 65,
      fixedIncome: 15,
      alternatives: 15,
      cash: 5,
    },
    recentActivity: "Inquired about crypto investments last week",
    concerns: ["Wealth growth", "Tax minimization", "Business succession"],
    opportunities: ["Growth stock concentration", "Alternative investments", "Tax-advantaged accounts"],
  },
  {
    id: "4",
    name: "Emily Wilson",
    avatar: "/placeholder-user.jpg",
    initials: "EW",
    email: "emily.w@example.com",
    aum: "$950K",
    performance: "+6.8%",
    riskProfile: "Moderate",
    nextReview: "May 12, 2023",
    insights: [{ type: "review", label: "Review Due" }],
    portfolio: {
      equities: 50,
      fixedIncome: 30,
      alternatives: 10,
      cash: 10,
    },
    recentActivity: "Scheduled annual review for next week",
    concerns: ["Retirement readiness", "Healthcare costs", "Legacy planning"],
    opportunities: ["IRA conversion", "Long-term care insurance", "Estate plan review"],
  },
]

// Sample conversation starters
const conversationStarters = [
  "What are the top opportunities for John Doe?",
  "Show me clients with tax-loss harvesting opportunities",
  "Which clients need portfolio rebalancing?",
  "Generate a meeting prep summary for Alice Smith",
  "What's the risk exposure in Robert Johnson's portfolio?",
  "Identify clients affected by recent tech sector volatility",
]

const questionStarters = ["How will", "What if", "When should", "Can I", "Should we", "Is it possible"]

const questionContinuations = {
  "How will": ["my retirement plan", "market volatility", "tax changes", "interest rates", "inflation"],
  "What if": ["I need cash", "the market crashes", "I retire early", "I change jobs", "I sell my business"],
  "When should": [
    "I start taking Social Security",
    "I rebalance my portfolio",
    "I update my estate plan",
    "I convert to a Roth IRA",
    "I take required distributions",
  ],
  "Can I": [
    "afford to retire",
    "buy a second home",
    "fund college education",
    "reduce my tax burden",
    "increase my income",
  ],
  "Should we": [
    "invest more aggressively",
    "diversify further",
    "consider alternatives",
    "focus on income",
    "reduce debt",
  ],
  "Is it possible": [
    "to retire by 55",
    "to generate more income",
    "to minimize taxes",
    "to protect against inflation",
    "to transfer wealth tax-efficiently",
  ],
}

const questionEndings = {
  "my retirement plan": [
    "be affected by inflation?",
    "need to be adjusted?",
    "provide enough income?",
    "last through my lifetime?",
  ],
  "market volatility": [
    "affect my portfolio?",
    "change my retirement date?",
    "require a strategy change?",
    "impact my income needs?",
  ],
  "tax changes": [
    "impact my retirement?",
    "affect my estate plan?",
    "require portfolio adjustments?",
    "change my withdrawal strategy?",
  ],
  "interest rates": [
    "affect my bond holdings?",
    "impact my mortgage decision?",
    "change my investment strategy?",
    "influence my retirement income?",
  ],
  inflation: [
    "erode my purchasing power?",
    "require portfolio changes?",
    "affect my retirement needs?",
    "impact my long-term plan?",
  ],
  // Add more mappings for other continuations...
  "I need cash": [
    "for an emergency?",
    "to make a large purchase?",
    "to help family members?",
    "which investments should I liquidate?",
  ],
  "the market crashes": [
    "will my portfolio recover?",
    "should I change my strategy?",
    "how will it affect my retirement?",
    "what actions should I take?",
  ],
  // Add more mappings as needed for other continuation options
}

// Message types
type MessageType = "user" | "ai" | "insight" | "action" | "chart"

interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
  clientId?: string
  insightType?: "portfolio" | "risk" | "tax" | "client" | "market"
  actions?: { label: string; action: string }[]
  chartData?: any
}

interface SentenceBuilder {
  starter: string | null
  continuation: string | null
  ending: string | null
  customEnding: string
}

export default function WealthAIChat() {
  const isMobile = useIsMobile()
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "Hello, I'm your WealthAI assistant. Select a client or ask me anything about your clients' portfolios, risk profiles, or opportunities.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [clientMenuOpen, setClientMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Add sentence builder state
  const [sentenceBuilder, setSentenceBuilder] = useState<SentenceBuilder>({
    starter: null,
    continuation: null,
    ending: null,
    customEnding: "",
  })
  const [showCustomInput, setShowCustomInput] = useState(false)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get selected client data
  const getSelectedClient = () => {
    return clients.find((client) => client.id === selectedClient) || null
  }

  // Handle client selection
  const handleSelectClient = (clientId: string) => {
    setSelectedClient(clientId)
    const client = clients.find((c) => c.id === clientId)

    if (client) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content: `I've loaded ${client.name}'s profile. What would you like to know about their portfolio, risk profile, or opportunities?`,
          timestamp: new Date(),
          clientId: clientId,
        },
      ])
    }

    setClientMenuOpen(false)
  }

  // Handle message submission
  const handleSubmitMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      clientId: selectedClient || undefined,
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

  // Generate AI response based on user message
  const generateAIResponse = (userMessage: Message) => {
    const client = getSelectedClient()
    const query = userMessage.content.toLowerCase()

    // Portfolio-related queries
    if (query.includes("portfolio") || query.includes("allocation") || query.includes("assets")) {
      if (client) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "portfolio",
            content: `${client.name}'s portfolio is currently allocated as follows: ${client.portfolio.equities}% equities, ${client.portfolio.fixedIncome}% fixed income, ${client.portfolio.alternatives}% alternatives, and ${client.portfolio.cash}% cash.`,
            timestamp: new Date(),
            clientId: client.id,
            actions: [
              { label: "View Full Portfolio", action: "viewPortfolio" },
              { label: "Generate Rebalancing Plan", action: "rebalance" },
            ],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content:
              "Please select a client first to view their portfolio details, or ask me about all clients with specific portfolio characteristics.",
            timestamp: new Date(),
          },
        ])
      }
      return
    }

    // Risk-related queries
    if (query.includes("risk") || query.includes("volatility") || query.includes("exposure")) {
      if (client) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "risk",
            content: `${client.name} has a ${client.riskProfile.toLowerCase()} risk profile. Based on recent market conditions, I've identified potential concerns in their technology sector exposure, which represents 22% of their equity allocation.`,
            timestamp: new Date(),
            clientId: client.id,
            actions: [
              { label: "View Risk Analysis", action: "viewRisk" },
              { label: "Generate Hedging Strategy", action: "hedge" },
            ],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content:
              "I can provide risk analysis for specific clients. Please select a client or ask about clients with high risk exposure in specific sectors.",
            timestamp: new Date(),
          },
        ])
      }
      return
    }

    // Tax-related queries
    if (query.includes("tax") || query.includes("harvesting") || query.includes("optimization")) {
      if (client) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "tax",
            content: `I've identified tax-loss harvesting opportunities for ${client.name} that could save approximately $12,500 in taxes this year. There are 3 positions that could be sold and replaced with similar investments to maintain market exposure while capturing losses.`,
            timestamp: new Date(),
            clientId: client.id,
            actions: [
              { label: "View Tax Opportunities", action: "viewTax" },
              { label: "Generate Tax Report", action: "taxReport" },
            ],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content:
              "I can identify tax optimization opportunities for specific clients. Please select a client or ask about all clients with tax-loss harvesting potential.",
            timestamp: new Date(),
          },
        ])
      }
      return
    }

    // Opportunities or recommendations
    if (query.includes("opportunities") || query.includes("recommend") || query.includes("suggest")) {
      if (client) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "client",
            content: `Based on ${client.name}'s profile and recent market conditions, I've identified these key opportunities:\n\n1. ${client.opportunities[0]}\n2. ${client.opportunities[1]}\n3. ${client.opportunities[2]}\n\nWould you like me to elaborate on any of these?`,
            timestamp: new Date(),
            clientId: client.id,
            actions: [
              { label: "Generate Detailed Report", action: "opportunitiesReport" },
              { label: "Prepare Client Presentation", action: "presentation" },
            ],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content:
              "I can recommend opportunities for specific clients. Please select a client first, or ask about opportunities across all clients.",
            timestamp: new Date(),
          },
        ])
      }
      return
    }

    // Meeting or review prep
    if (query.includes("meeting") || query.includes("review") || query.includes("prep")) {
      if (client) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "client",
            content: `Here's a meeting prep summary for ${client.name}:\n\n• Portfolio: ${client.performance} YTD (${client.portfolio.equities}% equities)\n• Risk Profile: ${client.riskProfile}\n• Recent Activity: ${client.recentActivity}\n• Key Concerns: ${client.concerns.join(", ")}\n• Opportunities to Discuss: ${client.opportunities.join(", ")}\n\nNext scheduled review: ${client.nextReview}`,
            timestamp: new Date(),
            clientId: client.id,
            actions: [
              { label: "Generate Talking Points", action: "talkingPoints" },
              { label: "Schedule Meeting", action: "schedule" },
            ],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "ai",
            content: "I can help prepare for client meetings. Please select a specific client first.",
            timestamp: new Date(),
          },
        ])
      }
      return
    }

    // Clients with specific characteristics
    if (query.includes("clients with") || query.includes("which clients") || query.includes("show me clients")) {
      // Tax opportunities
      if (query.includes("tax")) {
        const taxClients = clients.filter((c) => c.insights.some((i) => i.type === "tax"))
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "tax",
            content: `I've identified ${taxClients.length} clients with tax optimization opportunities:\n\n${taxClients.map((c) => `• ${c.name} (${c.aum})`).join("\n")}\n\nWould you like me to analyze any specific client in detail?`,
            timestamp: new Date(),
            actions: [{ label: "Generate Tax Report", action: "batchTaxReport" }],
          },
        ])
        return
      }

      // Rebalancing needs
      if (query.includes("rebalance") || query.includes("rebalancing")) {
        const rebalanceClients = clients.filter((c) => c.insights.some((i) => i.type === "rebalance"))
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "portfolio",
            content: `I've identified ${rebalanceClients.length} clients who need portfolio rebalancing:\n\n${rebalanceClients.map((c) => `• ${c.name} (${c.aum})`).join("\n")}\n\nWould you like me to generate rebalancing plans for these clients?`,
            timestamp: new Date(),
            actions: [{ label: "Generate Rebalancing Plans", action: "batchRebalance" }],
          },
        ])
        return
      }

      // Risk alerts
      if (query.includes("risk") || query.includes("volatility")) {
        const riskClients = clients.filter((c) => c.insights.some((i) => i.type === "risk"))
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "insight",
            insightType: "risk",
            content: `I've identified ${riskClients.length} clients with elevated risk levels:\n\n${riskClients.map((c) => `• ${c.name} (${c.riskProfile})`).join("\n")}\n\nThese clients may need risk mitigation strategies.`,
            timestamp: new Date(),
            actions: [{ label: "Generate Risk Report", action: "batchRiskReport" }],
          },
        ])
        return
      }
    }

    // Market impact
    if (
      query.includes("market") ||
      query.includes("sector") ||
      query.includes("volatility") ||
      query.includes("tech")
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "insight",
          insightType: "market",
          content:
            "Based on recent market volatility in the technology sector, I've identified 8 clients with significant exposure who may be impacted. The average exposure is 18% of their portfolios, with potential volatility impact of 2.4% in the short term.",
          timestamp: new Date(),
          actions: [
            { label: "View Affected Clients", action: "viewAffectedClients" },
            { label: "Generate Hedging Strategies", action: "batchHedge" },
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
        content: client
          ? `I can help you analyze ${client.name}'s portfolio, risk profile, tax situation, or upcoming review. What specific aspect would you like to explore?`
          : "I can provide insights on client portfolios, risk profiles, tax optimization, and more. Please select a client or ask about specific client characteristics.",
        timestamp: new Date(),
        clientId: client?.id,
      },
    ])
  }

  // Handle conversation starter click
  const handleStarterClick = (starter: string) => {
    setInputValue(starter)
    setTimeout(() => {
      handleSubmitMessage()
    }, 100)
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
        const client = getSelectedClient()
        if (client) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "chart",
              content: `Here's ${client.name}'s current portfolio allocation:`,
              timestamp: new Date(),
              clientId: client.id,
              chartData: {
                labels: ["Equities", "Fixed Income", "Alternatives", "Cash"],
                values: [
                  client.portfolio.equities,
                  client.portfolio.fixedIncome,
                  client.portfolio.alternatives,
                  client.portfolio.cash,
                ],
              },
            },
          ])
        }
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

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Reset sentence builder
  const resetSentenceBuilder = () => {
    setSentenceBuilder({
      starter: null,
      continuation: null,
      ending: null,
      customEnding: "",
    })
    setShowCustomInput(false)
  }

  // Handle sentence starter selection
  const handleStarterSelect = (starter: string) => {
    setSentenceBuilder({
      starter: starter,
      continuation: null,
      ending: null,
      customEnding: "",
    })
    setShowCustomInput(false)
  }

  // Handle sentence continuation selection
  const handleContinuationSelect = (continuation: string) => {
    setSentenceBuilder({
      ...sentenceBuilder,
      continuation: continuation,
      ending: null,
      customEnding: "",
    })
    setShowCustomInput(false)
  }

  // Handle sentence ending selection
  const handleEndingSelect = (ending: string) => {
    setSentenceBuilder({
      ...sentenceBuilder,
      ending: ending,
      customEnding: "",
    })
    setShowCustomInput(false)

    // Auto-submit the completed sentence
    const fullSentence = `${sentenceBuilder.starter} ${sentenceBuilder.continuation} ${ending}`
    setInputValue(fullSentence)
    setTimeout(() => {
      handleSubmitMessage()
      resetSentenceBuilder()
    }, 100)
  }

  // Handle custom ending input
  const handleCustomEndingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSentenceBuilder({
      ...sentenceBuilder,
      customEnding: e.target.value,
    })
  }

  // Handle custom ending submission
  const handleCustomEndingSubmit = () => {
    if (!sentenceBuilder.customEnding.trim()) return

    const fullSentence = `${sentenceBuilder.starter} ${sentenceBuilder.continuation} ${sentenceBuilder.customEnding}`
    setInputValue(fullSentence)
    setTimeout(() => {
      handleSubmitMessage()
      resetSentenceBuilder()
    }, 100)
  }

  // Toggle custom input
  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput)
  }

  // Get current sentence
  const getCurrentSentence = () => {
    let sentence = ""
    if (sentenceBuilder.starter) {
      sentence += sentenceBuilder.starter
    }
    if (sentenceBuilder.continuation) {
      sentence += " " + sentenceBuilder.continuation
    }
    if (sentenceBuilder.ending) {
      sentence += " " + sentenceBuilder.ending
    } else if (showCustomInput && sentenceBuilder.customEnding) {
      sentence += " " + sentenceBuilder.customEnding
    }
    return sentence
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <LineChart className="h-6 w-6" />
                <span className="font-bold">WealthAI</span>
              </a>
              <Separator className="my-2" />
              <a href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary">
                <MessageSquare className="h-5 w-5" />
                AI Assistant
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <Users className="h-5 w-5" />
                Clients
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
          <LineChart className="h-6 w-6" />
          <span className="font-bold hidden md:inline-block">WealthAI</span>
        </a>
        <div className="flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients, insights, or conversations..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px]">3</Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>WM</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[280px] flex-col border-r bg-background md:flex">
          <div className="p-4">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Clients</h2>
            <div className="space-y-1">
              {clients.map((client) => (
                <Button
                  key={client.id}
                  variant={selectedClient === client.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSelectClient(client.id)}
                >
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{client.name}</span>
                  {client.insights.length > 0 && (
                    <Badge variant="outline" className="ml-auto">
                      {client.insights.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
          <Separator />
          <div className="p-4">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Recent Insights</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4 text-emerald-500" />
                <span className="truncate">Portfolio Opportunities</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                <span className="truncate">Risk Alerts</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
                <span className="truncate">Tax Optimization</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4 text-purple-500" />
                <span className="truncate">Market Analysis</span>
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Mobile client selector */}
            <div className="md:hidden p-2 border-b">
              <DropdownMenu open={clientMenuOpen} onOpenChange={setClientMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedClient ? clients.find((c) => c.id === selectedClient)?.name : "Select a client"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-1rem)]">
                  <DropdownMenuLabel>Clients</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {clients.map((client) => (
                    <DropdownMenuItem key={client.id} onClick={() => handleSelectClient(client.id)}>
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>{client.initials}</AvatarFallback>
                      </Avatar>
                      {client.name}
                      {client.insights.length > 0 && (
                        <Badge variant="outline" className="ml-auto">
                          {client.insights.length}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    {message.type !== "user" && (
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] ${message.type === "user" ? "bg-primary text-primary-foreground" : message.type === "insight" ? "bg-card border" : message.type === "action" ? "bg-muted" : "bg-muted"} rounded-lg px-4 py-3`}
                    >
                      {message.type === "insight" && (
                        <div className="flex items-center gap-2 mb-2">
                          {message.insightType === "portfolio" && <PieChart className="h-4 w-4 text-primary" />}
                          {message.insightType === "risk" && <ShieldAlert className="h-4 w-4 text-amber-500" />}
                          {message.insightType === "tax" && <DollarSign className="h-4 w-4 text-emerald-500" />}
                          {message.insightType === "client" && <User className="h-4 w-4 text-blue-500" />}
                          {message.insightType === "market" && <TrendingUp className="h-4 w-4 text-purple-500" />}
                          <span className="font-medium">
                            {message.insightType === "portfolio" && "Portfolio Insight"}
                            {message.insightType === "risk" && "Risk Analysis"}
                            {message.insightType === "tax" && "Tax Opportunity"}
                            {message.insightType === "client" && "Client Insight"}
                            {message.insightType === "market" && "Market Analysis"}
                          </span>
                        </div>
                      )}
                      <div className="whitespace-pre-line">{message.content}</div>

                      {message.chartData && (
                        <div className="mt-4 h-64 w-full rounded-md bg-background p-4">
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
                                          ? "bg-primary"
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
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="mt-1 text-right text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.type === "user" && (
                      <Avatar className="ml-2 h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>WM</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] bg-muted rounded-lg px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Circular Sentence Builder */}
            <div className="px-4 py-3 border-t">
              <h3 className="text-sm font-medium mb-2">Build a client question:</h3>

              {/* Current sentence display */}
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">{getCurrentSentence() || "Select options below to build a question..."}</p>
              </div>

              {/* Circular options */}
              <div className="mb-4">
                {/* First level - Question starters */}
                {!sentenceBuilder.starter && (
                  <div className="relative h-[200px] w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-[180px] w-[180px]">
                        {questionStarters.map((starter, index) => {
                          const angle = index * (360 / questionStarters.length) * (Math.PI / 180)
                          const x = 70 * Math.cos(angle)
                          const y = 70 * Math.sin(angle)

                          return (
                            <motion.button
                              key={starter}
                              className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium hover:bg-primary/90"
                              style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                              }}
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleStarterSelect(starter)}
                            >
                              {starter}
                            </motion.button>
                          )
                        })}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-background rounded-full h-16 w-16 flex items-center justify-center text-sm font-medium text-center">
                            Start here
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Second level - Continuations */}
                {sentenceBuilder.starter && !sentenceBuilder.continuation && (
                  <div className="relative h-[200px] w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-[180px] w-[180px]">
                        {questionContinuations[sentenceBuilder.starter as keyof typeof questionContinuations]?.map(
                          (continuation, index) => {
                            const continuations =
                              questionContinuations[sentenceBuilder.starter as keyof typeof questionContinuations] || []
                            const angle = index * (360 / continuations.length) * (Math.PI / 180)
                            const x = 70 * Math.cos(angle)
                            const y = 70 * Math.sin(angle)

                            return (
                              <motion.button
                                key={continuation}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium hover:bg-secondary/90"
                                style={{
                                  left: `calc(50% + ${x}px)`,
                                  top: `calc(50% + ${y}px)`,
                                }}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => handleContinuationSelect(continuation)}
                              >
                                {continuation}
                              </motion.button>
                            )
                          },
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            className="bg-destructive/10 text-destructive rounded-full h-16 w-16 flex items-center justify-center text-sm font-medium"
                            onClick={resetSentenceBuilder}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Third level - Endings */}
                {sentenceBuilder.starter &&
                  sentenceBuilder.continuation &&
                  !sentenceBuilder.ending &&
                  !showCustomInput && (
                    <div className="relative h-[200px] w-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative h-[180px] w-[180px]">
                          {questionEndings[sentenceBuilder.continuation as keyof typeof questionEndings]?.map(
                            (ending, index) => {
                              const endings =
                                questionEndings[sentenceBuilder.continuation as keyof typeof questionEndings] || []
                              const angle = index * (360 / endings.length) * (Math.PI / 180)
                              const x = 70 * Math.cos(angle)
                              const y = 70 * Math.sin(angle)

                              return (
                                <motion.button
                                  key={ending}
                                  className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-medium hover:bg-accent/90"
                                  style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    maxWidth: "120px",
                                  }}
                                  whileHover={{ scale: 1.1 }}
                                  onClick={() => handleEndingSelect(ending)}
                                >
                                  {ending}
                                </motion.button>
                              )
                            },
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col gap-2">
                              <button
                                className="bg-primary rounded-full h-16 w-16 flex items-center justify-center text-sm font-medium text-primary-foreground"
                                onClick={toggleCustomInput}
                              >
                                Custom
                              </button>
                              <button
                                className="bg-destructive/10 text-destructive rounded-full h-8 w-16 flex items-center justify-center text-xs font-medium"
                                onClick={resetSentenceBuilder}
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Custom ending input */}
                {sentenceBuilder.starter && sentenceBuilder.continuation && showCustomInput && (
                  <div className="flex flex-col gap-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Complete the question..."
                        value={sentenceBuilder.customEnding}
                        onChange={handleCustomEndingChange}
                        className="flex-1"
                      />
                      <Button onClick={handleCustomEndingSubmit} disabled={!sentenceBuilder.customEnding.trim()}>
                        Ask
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetSentenceBuilder}>
                      Reset
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Question Builder */}
            <div className="px-4 py-3 border-t">
              <h3 className="text-sm font-medium mb-2">Build a client question:</h3>

              {/* Current sentence display */}
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">{getCurrentSentence() || "Select options below to build a question..."}</p>
              </div>

              {/* Step-by-step question builder */}
              <div className="space-y-4">
                {/* Step 1: Question starters */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-muted-foreground">1. Select a starter</h4>
                    {sentenceBuilder.starter && (
                      <Button variant="ghost" size="sm" onClick={resetSentenceBuilder} className="h-7 px-2 text-xs">
                        Reset
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {questionStarters.map((starter) => (
                      <Button
                        key={starter}
                        size="sm"
                        variant={sentenceBuilder.starter === starter ? "default" : "outline"}
                        className={`text-sm ${sentenceBuilder.starter && sentenceBuilder.starter !== starter ? "opacity-50" : ""}`}
                        onClick={() => handleStarterSelect(starter)}
                        disabled={sentenceBuilder.starter && sentenceBuilder.starter !== starter}
                      >
                        {starter}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Continuations */}
                {sentenceBuilder.starter && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">2. Select a continuation</h4>
                    <div className="flex flex-wrap gap-2">
                      {questionContinuations[sentenceBuilder.starter as keyof typeof questionContinuations]?.map(
                        (continuation) => (
                          <Button
                            key={continuation}
                            size="sm"
                            variant={sentenceBuilder.continuation === continuation ? "secondary" : "outline"}
                            className={`text-sm ${sentenceBuilder.continuation && sentenceBuilder.continuation !== continuation ? "opacity-50" : ""}`}
                            onClick={() => handleContinuationSelect(continuation)}
                            disabled={sentenceBuilder.continuation && sentenceBuilder.continuation !== continuation}
                          >
                            {continuation}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Endings */}
                {sentenceBuilder.starter && sentenceBuilder.continuation && !showCustomInput && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">3. Select an ending or</h4>
                      <Button variant="secondary" size="sm" onClick={toggleCustomInput} className="h-7 px-2 text-xs">
                        Write custom
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {questionEndings[sentenceBuilder.continuation as keyof typeof questionEndings]?.map((ending) => (
                        <Button
                          key={ending}
                          size="sm"
                          variant="outline"
                          className="text-sm"
                          onClick={() => handleEndingSelect(ending)}
                        >
                          {ending}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom ending input */}
                {sentenceBuilder.starter && sentenceBuilder.continuation && showCustomInput && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">3. Write a custom ending</h4>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Complete the question..."
                        value={sentenceBuilder.customEnding}
                        onChange={handleCustomEndingChange}
                        className="flex-1"
                      />
                      <Button onClick={handleCustomEndingSubmit} disabled={!sentenceBuilder.customEnding.trim()}>
                        Ask
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Conversation starters */}
            {messages.length <= 2 && !selectedClient && (
              <div className="px-4 py-3 border-t">
                <h3 className="text-sm font-medium mb-2">Try asking:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {conversationStarters.map((starter) => (
                    <Button
                      key={starter}
                      variant="outline"
                      className="justify-start h-auto py-2 text-left"
                      onClick={() => handleStarterClick(starter)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">{starter}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="border-t p-4">
              <form
                className="flex items-end gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmitMessage()
                }}
              >
                <Input
                  className="flex-1"
                  placeholder="Ask about clients, portfolios, or opportunities..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
                  <ArrowUp className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
              <p className="mt-2 text-xs text-center text-muted-foreground">
                WealthAI uses client data to provide personalized insights and recommendations.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

