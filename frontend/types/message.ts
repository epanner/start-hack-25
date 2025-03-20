export type MessageType = "user" | "ai" | "insight" | "action" | "chart" | "preset"

export interface Message {
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

export interface SentenceBuilder {
  starter: string | null
  continuation: string | null
  ending: string | null
  customEnding: string
}

