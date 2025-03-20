"use client"

import { useState, useRef, useEffect } from "react"
import type { Message } from "@/types/message"
import type { Client } from "@/types/client"
import { marketData } from "@/data/market"

export function useAIChat(clientData: Client) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Preset selection state
  const [selectedMainPreset, setSelectedMainPreset] = useState<string | null>(null)
  const [showRefinedPresets, setShowRefinedPresets] = useState(false)

  // Initialize AI chat with welcome message
  useEffect(() => {
    if (showAIChat && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "ai",
          content: `Hello, I'm your FinancePro assistant. I can help you analyze ${clientData.name}'s portfolio, risk profile, tax situation, or retirement planning. Choose a preset below or ask me anything specific.`,
          timestamp: new Date(),
        },
      ])
    }
  }, [showAIChat, clientData.name, messages.length])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Toggle AI chat view
  const toggleAIChat = () => {
    setShowAIChat(!showAIChat)
  }

  // Reset chat messages
  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        type: "ai",
        content: `Hello, I'm your FinancePro assistant. I can help you analyze ${clientData.name}'s portfolio, risk profile, tax situation, or retirement planning. Choose a preset below or ask me anything specific.`,
        timestamp: new Date(),
      },
    ])
    resetPresetSelection()
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

  // Handle action button click
  const handleActionButtonClick = (prompt: string) => {
    setInputValue(prompt)
    setShowAIChat(true)
    setTimeout(() => {
      handleSubmitMessage()
    }, 100)
  }

  // Handle action click
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

  // Update the handlePresetSelect function to handle the two-step process
  const handleMainPresetSelect = (presetType: string) => {
    setSelectedMainPreset(presetType)
    setShowRefinedPresets(true)
  }

  const handleRefinedPresetSelect = (refinedPreset: string) => {
    let presetContent = ""

    // Construct the prompt based on the main preset and refined preset
    if (selectedMainPreset === "brief") {
      if (refinedPreset === "financial") {
        presetContent = `Give me a short financial review for ${clientData.name}`
      } else if (refinedPreset === "risk") {
        presetContent = `Provide a risk assessment for ${clientData.name}'s portfolio`
      } else if (refinedPreset === "alerts") {
        presetContent = `What are the key alerts I should be aware of for ${clientData.name}?`
      } else if (refinedPreset === "market") {
        presetContent = `Summarize recent market shifts affecting ${clientData.name}'s portfolio`
      } else if (refinedPreset === "performance") {
        presetContent = `Give me a portfolio performance summary for ${clientData.name}`
      }
    } else if (selectedMainPreset === "update") {
      if (refinedPreset === "financial") {
        presetContent = `Provide a comprehensive financial review for ${clientData.name}`
      } else if (refinedPreset === "downturn") {
        presetContent = `How would a market downturn affect ${clientData.name}'s portfolio?`
      }
    } else if (selectedMainPreset === "prepare") {
      if (refinedPreset === "meeting") {
        presetContent = `Help me prepare for a potential meeting with ${clientData.name}`
      } else if (refinedPreset === "call") {
        presetContent = `Prepare me for a call with ${clientData.name}`
      } else if (refinedPreset === "points") {
        presetContent = `What are the key points to discuss with ${clientData.name}?`
      } else if (refinedPreset === "questions") {
        presetContent = `What questions might ${clientData.name} ask in our next meeting?`
      }
    }

    const presetMessage: Message = {
      id: Date.now().toString(),
      type: "preset",
      content: presetContent,
      timestamp: new Date(),
      clientId: clientData.id,
      presetType: selectedMainPreset as any,
    }

    setMessages((prev) => [...prev, presetMessage])
    setIsLoading(true)
    setShowRefinedPresets(false)
    setSelectedMainPreset(null)

    // Simulate AI response
    setTimeout(() => {
      generatePresetResponse(presetMessage)
      setIsLoading(false)
    }, 1500)
  }

  const resetPresetSelection = () => {
    setShowRefinedPresets(false)
    setSelectedMainPreset(null)
  }

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

  return {
    messages,
    inputValue,
    isLoading,
    showAIChat,
    messagesEndRef,
    selectedMainPreset,
    showRefinedPresets,
    setInputValue,
    toggleAIChat,
    handleSubmitMessage,
    handleActionButtonClick,
    handleActionClick,
    handleMainPresetSelect,
    handleRefinedPresetSelect,
    resetPresetSelection,
    resetChat,
  }
}

