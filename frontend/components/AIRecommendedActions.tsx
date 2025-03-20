"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Client } from "@/types/client"

interface AIRecommendedActionsProps {
  client: Client
  isEnlarged: boolean
  onToggleEnlarge: () => void
  onActionClick: (prompt: string) => void
}

export function AIRecommendedActions({
  client,
  isEnlarged,
  onToggleEnlarge,
  onActionClick,
}: AIRecommendedActionsProps) {
  return (
    <Card className="bg-slate-900 border-[#af2018]/30 text-white shadow-md relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-[#af2018]/20 to-transparent pointer-events-none"></div>
      <CardHeader className="pb-2 border-b border-slate-800 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base text-white">AI-recommended Actions</CardTitle>
            <CardDescription className="text-slate-400">Prioritized next steps</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleEnlarge}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span className="sr-only">Enlarge</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-3 px-3 flex-1">
        <div className="space-y-3">
          <div className="rounded-md bg-[#af2018]/10 border border-[#af2018]/30 p-4">
            <h4 className="text-sm font-medium mb-3 text-white text-center">Top Recommended Actions</h4>
            <ul className="space-y-3">
              <li
                className="flex items-start gap-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() =>
                  onActionClick(
                    `Generate a portfolio rebalancing plan for ${client.name} to reduce technology sector exposure by 7%`,
                  )
                }
              >
                <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Portfolio Rebalancing</p>
                  <p className="text-xs text-slate-400">
                    Technology sector overweight by 7% relative to target allocation
                  </p>
                </div>
              </li>
              <li
                className="flex items-start gap-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() =>
                  onActionClick(
                    `Create a tax-loss harvesting strategy for ${client.name} to save ${client.taxSavingsOpportunity} before year-end`,
                  )
                }
              >
                <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Tax-Loss Harvesting</p>
                  <p className="text-xs text-slate-400">
                    Potential savings of {client.taxSavingsOpportunity} before year-end
                  </p>
                </div>
              </li>
              <li
                className="flex items-start gap-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() =>
                  onActionClick(
                    `Prepare materials for ${client.name}'s upcoming ${client.upcomingEvents[0].title} on ${client.upcomingEvents[0].date}`,
                  )
                }
              >
                <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Meeting Preparation</p>
                  <p className="text-xs text-slate-400">
                    {client.upcomingEvents[0].title} on {client.upcomingEvents[0].date}
                  </p>
                </div>
              </li>
              <li
                className="flex items-start gap-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() =>
                  onActionClick(
                    `Update risk tolerance assessment for ${client.name} and recommend adjustments based on current market conditions`,
                  )
                }
              >
                <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">4</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Risk Assessment Update</p>
                  <p className="text-xs text-slate-400">Last assessment completed 6 months ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-[#af2018] border-[#8a1a13] text-white hover:bg-[#8a1a13]"
          onClick={onToggleEnlarge}
        >
          View All Recommended Actions
        </Button>
      </CardFooter>
    </Card>
  )
}

