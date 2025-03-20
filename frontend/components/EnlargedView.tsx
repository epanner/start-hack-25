"use client"

import { Button } from "@/components/ui/button"
import type { Client } from "@/types/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface EnlargedViewProps {
  boxType: string | null
  client: Client
  onClose: () => void
  onActionClick: (prompt: string) => void
}

export function EnlargedView({ boxType, client, onClose, onActionClick }: EnlargedViewProps) {
  if (!boxType) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg dark:bg-slate-900 dark:border-slate-800 light:bg-white light:border-slate-200 border shadow-xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 light:border-slate-200">
          <h2 className="text-xl font-semibold dark:text-white light:text-slate-900">
            {boxType === "customerInfo" && "Detailed Customer Information"}
            {boxType === "calendar" && "Calendar & Interactions"}
            {boxType === "actions" && "AI-recommended Actions"}
            {boxType === "portfolio" && "Portfolio Performance"}
            {boxType === "risk" && "Risk Assessment"}
            {boxType === "tax" && "Tax Optimization"}
            {boxType === "retirement" && "Retirement Planning"}
            {boxType === "investment" && "Investment Opportunities"}
            {boxType === "market" && "Market Insights"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {boxType === "customerInfo" && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback className="text-2xl">{client.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold dark:text-white light:text-slate-900">{client.name}</h3>
                  <p className="text-lg dark:text-slate-400 light:text-slate-500">{client.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="dark:bg-[#af2018] dark:text-white light:bg-[#af2018] light:text-white">
                      {client.riskProfile}
                    </Badge>
                    <Badge className="dark:bg-blue-900 dark:text-blue-100 light:bg-blue-100 light:text-blue-800">
                      AUM: {client.aum}
                    </Badge>
                    <Badge className="dark:bg-emerald-900 dark:text-emerald-100 light:bg-emerald-100 light:text-emerald-800">
                      YTD: {client.performance.ytd}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#af2018]">Professional Background</h4>
                  <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="dark:text-slate-400 light:text-slate-500">Occupation:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "Senior Executive, Tech Industry"
                          : client.id === "2"
                            ? "Retired CFO, Healthcare"
                            : "Business Owner, Manufacturing"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Education:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "MBA, Stanford University"
                          : client.id === "2"
                            ? "BS Finance, NYU"
                            : "MS Engineering, MIT"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Industry:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "Technology" : client.id === "2" ? "Healthcare" : "Manufacturing"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Years in Industry:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "22" : client.id === "2" ? "35" : "15"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Previous Roles:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "CTO, VP Engineering"
                          : client.id === "2"
                            ? "Controller, Accounting Manager"
                            : "Operations Director, Project Manager"}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-[#af2018]">Family & Personal</h4>
                  <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="dark:text-slate-400 light:text-slate-500">Marital Status:</div>
                      <div className="dark:text-white light:text-slate-900">{client.maritalStatus}</div>
                      <div className="dark:text-slate-400 light:text-slate-500">Children:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "2 (College age)" : client.id === "2" ? "3 (Adult)" : "1 (Teenager)"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Hobbies:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "Golf, Sailing"
                          : client.id === "2"
                            ? "Travel, Reading"
                            : "Mountain Biking, Wine Collecting"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Charitable Interests:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "Education, Environment"
                          : client.id === "2"
                            ? "Healthcare, Arts"
                            : "Youth Programs, Local Business"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#af2018]">Financial Preferences</h4>
                  <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="dark:text-slate-400 light:text-slate-500">Investment Style:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "Growth-oriented"
                          : client.id === "2"
                            ? "Income-focused"
                            : "Aggressive growth"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Risk Tolerance:</div>
                      <div className="dark:text-white light:text-slate-900">{client.riskProfile}</div>
                      <div className="dark:text-slate-400 light:text-slate-500">ESG Preference:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "High priority" : client.id === "2" ? "Moderate interest" : "Low priority"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Liquidity Needs:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "Medium" : client.id === "2" ? "High" : "Low"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Tax Sensitivity:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "High" : client.id === "2" ? "Very High" : "Medium"}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-[#af2018]">Communication Preferences</h4>
                  <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="dark:text-slate-400 light:text-slate-500">Preferred Contact:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "Email" : client.id === "2" ? "Phone" : "In-person"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Meeting Frequency:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "Quarterly" : client.id === "2" ? "Monthly" : "Bi-monthly"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Report Detail Level:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1" ? "Detailed" : client.id === "2" ? "Summary" : "Comprehensive"}
                      </div>
                      <div className="dark:text-slate-400 light:text-slate-500">Communication Style:</div>
                      <div className="dark:text-white light:text-slate-900">
                        {client.id === "1"
                          ? "Data-driven"
                          : client.id === "2"
                            ? "Relationship-focused"
                            : "Direct and concise"}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-[#af2018]">Notes & Special Considerations</h4>
                  <div className="rounded-lg dark:bg-slate-800 light:bg-slate-100 p-4">
                    <p className="dark:text-white light:text-slate-900">
                      {client.id === "1"
                        ? "Client is interested in sustainable investments and planning for early retirement. Has expressed interest in legacy planning for children's education. Prefers detailed performance metrics and regular portfolio reviews."
                        : client.id === "2"
                          ? "Client is focused on income generation and wealth preservation. Has health concerns that may impact long-term planning. Interested in charitable giving strategies and estate planning."
                          : "Business owner with succession planning needs. Interested in alternative investments and tax minimization strategies. May need liquidity for business expansion in next 2-3 years."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  className="dark:bg-[#af2018] dark:hover:bg-[#8a1a13] light:bg-[#af2018] light:hover:bg-[#8a1a13] text-white"
                  onClick={() => onActionClick("Generate a comprehensive client profile for " + client.name)}
                >
                  Generate Full Profile Report
                </Button>
              </div>
            </div>
          )}

          {boxType === "actions" && (
            <div className="space-y-6">
              <div className="rounded-md bg-[#af2018]/10 border border-[#af2018]/30 p-4">
                <h3 className="text-xl font-semibold dark:text-white light:text-slate-900 mb-4">
                  Comprehensive Action Plan
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-[#af2018] mb-3">High Priority Actions</h4>
                    <ul className="space-y-4">
                      <li
                        className="flex items-start gap-3 p-3 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onActionClick(
                            `Generate a portfolio rebalancing plan for ${client.name} to reduce technology sector exposure by 7%`,
                          )
                          onClose()
                        }}
                      >
                        <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">1</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-white">Portfolio Rebalancing</p>
                          <p className="text-sm text-slate-400 mt-1">
                            Technology sector is currently at {client.sectors.technology}%, which is 7% above the target
                            allocation for a {client.riskProfile.toLowerCase()} risk profile. Rebalancing would reduce
                            risk and potentially improve risk-adjusted returns.
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Estimated impact: Medium</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Recommended timeline: Within 7 days</span>
                          </div>
                        </div>
                      </li>

                      <li
                        className="flex items-start gap-3 p-3 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onActionClick(
                            `Create a tax-loss harvesting strategy for ${client.name} to save ${client.taxSavingsOpportunity} before year-end`,
                          )
                          onClose()
                        }}
                      >
                        <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">2</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-white">Tax-Loss Harvesting</p>
                          <p className="text-sm text-slate-400 mt-1">
                            Identified 3 positions with unrealized losses that could be sold and replaced with similar
                            investments to maintain market exposure while capturing losses. This could save
                            approximately {client.taxSavingsOpportunity} in taxes this year.
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Estimated impact: High</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Recommended timeline: Before December 15</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-[#af2018] mb-3">Meeting Preparation</h4>
                    <ul className="space-y-4">
                      <li
                        className="flex items-start gap-3 p-3 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onActionClick(
                            `Prepare materials for ${client.name}'s upcoming ${client.upcomingEvents[0].title} on ${client.upcomingEvents[0].date}`,
                          )
                          onClose()
                        }}
                      >
                        <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">3</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-white">
                            {client.upcomingEvents[0].title} Preparation
                          </p>
                          <p className="text-sm text-slate-400 mt-1">
                            Upcoming meeting on {client.upcomingEvents[0].date}. Prepare performance reports, portfolio
                            analysis, and discussion materials. Based on previous interactions, client will likely want
                            to discuss retirement planning progress and tax strategies.
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Estimated preparation time: 45 minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Recommended timeline: 2 days before meeting</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-[#af2018] mb-3">Documentation Updates</h4>
                    <ul className="space-y-4">
                      <li
                        className="flex items-start gap-3 p-3 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onActionClick(
                            `Update risk tolerance assessment for ${client.name} and recommend adjustments based on current market conditions`,
                          )
                          onClose()
                        }}
                      >
                        <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">4</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-white">Risk Assessment Update</p>
                          <p className="text-sm text-slate-400 mt-1">
                            Client's risk assessment was last updated 6 months ago. Given recent market volatility and
                            changes in the client's portfolio, an updated assessment is recommended to ensure alignment
                            with current goals and market conditions.
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Estimated impact: Medium</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Recommended timeline: Within 14 days</span>
                          </div>
                        </div>
                      </li>

                      <li
                        className="flex items-start gap-3 p-3 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onActionClick(
                            `Update investment policy statement for ${client.name} to reflect current goals and market outlook`,
                          )
                          onClose()
                        }}
                      >
                        <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-[#af2018] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">5</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-white">Investment Policy Statement Update</p>
                          <p className="text-sm text-slate-400 mt-1">
                            The client's investment policy statement should be updated to reflect changes in financial
                            goals, time horizon, and market conditions. Current statement is 12 months old.
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Estimated impact: Low</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#af2018]"></div>
                            <span className="text-xs text-slate-400">Recommended timeline: Within 30 days</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  className="dark:bg-[#af2018] dark:hover:bg-[#8a1a13] light:bg-[#af2018] light:hover:bg-[#8a1a13] text-white"
                  onClick={() => {
                    onActionClick(
                      `Generate a comprehensive action plan for ${client.name} with prioritized tasks, implementation timeline, and expected outcomes`,
                    )
                    onClose()
                  }}
                >
                  Generate Detailed Action Plan
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

