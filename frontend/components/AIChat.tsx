"use client"

import type React from "react"
import { ArrowUp, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Message } from "@/types/message"
import type { Client } from "@/types/client"
import { formatTime } from "@/utils/formatters"
import { PieChart, TrendingUp, ShieldAlert, DollarSign, User, Calendar } from "lucide-react"

interface AIPresetOption {
  title: string
  description: string
  onClick: () => void
}

interface AIRefinedOption {
  label: string
  onClick: () => void
}

interface AIMessageProps {
  message: Message
  onActionClick: (action: string) => void
}

interface AIChatProps {
  clientData: Client
  messages: Message[]
  inputValue: string
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
  selectedMainPreset: string | null
  showRefinedPresets: boolean
  setInputValue: (value: string) => void
  toggleAIChat: () => void
  handleSubmitMessage: () => void
  handleActionClick: (action: string) => void
  handleMainPresetSelect: (presetType: string) => void
  handleRefinedPresetSelect: (refinedPreset: string) => void
  resetPresetSelection: () => void
  resetChat: () => void
}

// Message component to display a single message
const AIMessage = ({ message, onActionClick }: AIMessageProps) => {
  return (
    <div className={`mb-6 ${message.type === "user" || message.type === "preset" ? "text-right" : ""}`}>
      <div
        className={`inline-block rounded-lg px-4 py-3 text-sm max-w-[80%] ${
          message.type === "user" || message.type === "preset"
            ? "bg-[#af2018] text-white"
            : message.type === "insight"
              ? "bg-slate-800 border border-slate-700"
              : "bg-slate-800"
        }`}
      >
        {message.type === "insight" && message.insightType && (
          <div className="flex items-center gap-2 mb-2">
            {message.insightType === "portfolio" && <PieChart className="h-4 w-4 text-[#af2018]" />}
            {message.insightType === "risk" && <ShieldAlert className="h-4 w-4 text-amber-500" />}
            {message.insightType === "tax" && <DollarSign className="h-4 w-4 text-emerald-500" />}
            {message.insightType === "client" && <User className="h-4 w-4 text-blue-500" />}
            {message.insightType === "market" && <TrendingUp className="h-4 w-4 text-[#af2018]" />}
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
                            ? "bg-[#af2018]"
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
                onClick={() => onActionClick(action.action)}
                className="bg-[#af2018] hover:bg-[#8a1a13] text-white border-[#af2018]"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        <div className="mt-1 text-right text-xs text-muted-foreground">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  )
}

// Main AI Chat component
export function AIChat({
  clientData,
  messages,
  inputValue,
  isLoading,
  messagesEndRef,
  selectedMainPreset,
  showRefinedPresets,
  setInputValue,
  toggleAIChat,
  handleSubmitMessage,
  handleActionClick,
  handleMainPresetSelect,
  handleRefinedPresetSelect,
  resetPresetSelection,
  resetChat,
}: AIChatProps) {
  const mainPresetOptions: AIPresetOption[] = [
    {
      title: "Brief",
      description: "Quick client insights",
      onClick: () => handleMainPresetSelect("brief"),
    },
    {
      title: "Update",
      description: "Comprehensive review",
      onClick: () => handleMainPresetSelect("update"),
    },
    {
      title: "Prepare",
      description: "Meeting preparation",
      onClick: () => handleMainPresetSelect("prepare"),
    },
  ]

  const refinedPresetOptions: Record<string, AIRefinedOption[]> = {
    brief: [
      { label: "Short Financial Review", onClick: () => handleRefinedPresetSelect("financial") },
      { label: "Risk Assessment", onClick: () => handleRefinedPresetSelect("risk") },
      { label: "Key Alerts", onClick: () => handleRefinedPresetSelect("alerts") },
      { label: "Market Shifts", onClick: () => handleRefinedPresetSelect("market") },
      { label: "Portfolio Performance", onClick: () => handleRefinedPresetSelect("performance") },
    ],
    update: [
      { label: "Financial Review", onClick: () => handleRefinedPresetSelect("financial") },
      { label: "Downturn Analysis", onClick: () => handleRefinedPresetSelect("downturn") },
    ],
    prepare: [
      { label: "Potential Meeting", onClick: () => handleRefinedPresetSelect("meeting") },
      { label: "Call Preparation", onClick: () => handleRefinedPresetSelect("call") },
      { label: "Discussion Points", onClick: () => handleRefinedPresetSelect("points") },
      { label: "Anticipated Questions", onClick: () => handleRefinedPresetSelect("questions") },
    ],
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-white">
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#af2018]" />
          <h2 className="text-lg font-semibold">FinancePro Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleAIChat} className="text-white hover:bg-slate-800">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <AIMessage key={message.id} message={message} onActionClick={handleActionClick} />
        ))}

        {messages.length > 1 && (
          <div className="mb-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={resetChat}
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
            {mainPresetOptions.map((option) => (
              <Button
                key={option.title}
                variant="outline"
                className="flex flex-col items-center justify-center h-24 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                onClick={option.onClick}
              >
                <span className="text-lg font-medium">{option.title}</span>
                <span className="text-xs text-slate-400 mt-1">{option.description}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Refined preset options - show after selecting a main preset */}
        {showRefinedPresets && selectedMainPreset && (
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
              {refinedPresetOptions[selectedMainPreset]?.map((option) => (
                <Button
                  key={option.label}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={option.onClick}
                >
                  <span className="font-medium">{option.label}</span>
                </Button>
              ))}
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
            className="absolute right-1 top-1/2 -translate-y-1/2 text-[#af2018] hover:bg-slate-700 hover:text-[#ff6b61]"
            onClick={handleSubmitMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

