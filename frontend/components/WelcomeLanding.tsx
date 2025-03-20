"use client"

import { useState } from "react"
import {
  ChevronRight,
  LineChart,
  Users,
  PieChart,
  Wallet,
  FileText,
  DollarSign,
  ShieldAlert,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface WelcomeLandingProps {
  onEnterDashboard: (selectedManager?: string) => void
}

type WealthManager = {
  id: string
  name: string
  title: string
  avatar: string
  initials: string
  clients: number
  aum: string
}

export function WelcomeLanding({ onEnterDashboard }: WelcomeLandingProps) {
  const [selectedManager, setSelectedManager] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample wealth managers data
  const wealthManagers: WealthManager[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Wealth Advisor",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
      clients: 42,
      aum: "$75M",
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Portfolio Manager",
      avatar: "/placeholder-user.jpg",
      initials: "MC",
      clients: 38,
      aum: "$68M",
    },
    {
      id: "3",
      name: "David Wilson",
      title: "Financial Consultant",
      avatar: "/placeholder-user.jpg",
      initials: "DW",
      clients: 31,
      aum: "$52M",
    },
  ]

  // Filter managers based on search query
  const filteredManagers = wealthManagers.filter(
    (manager) => searchQuery === "" || manager.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Quick access services
  const quickServices = [
    {
      title: "Client Onboarding",
      description: "Start the process for new clients",
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Portfolio Review",
      description: "Review and rebalance portfolios",
      icon: PieChart,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Tax Planning",
      description: "Identify tax optimization opportunities",
      icon: DollarSign,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Risk Assessment",
      description: "Analyze and mitigate client risks",
      icon: ShieldAlert,
      color: "bg-red-500/10 text-red-500",
    },
  ]

  // Today's highlights
  const todayHighlights = [
    {
      title: "Portfolio Alerts",
      value: "7",
      trend: "+2",
      status: "up",
      icon: TrendingUp,
    },
    {
      title: "Client Meetings",
      value: "3",
      trend: "0",
      status: "neutral",
      icon: Calendar,
    },
    {
      title: "AUM Today",
      value: "$76.4M",
      trend: "+1.2%",
      status: "up",
      icon: Wallet,
    },
    {
      title: "Documents Pending",
      value: "5",
      trend: "-2",
      status: "down",
      icon: FileText,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LineChart className="h-8 w-8 text-[#af2018]" />
          <div>
            <h1 className="text-2xl font-bold">WealthAI</h1>
            <p className="text-sm text-slate-400">AI-powered wealth management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src="/images/six-logo.png" alt="SIX Group" className="h-8" />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="grid gap-10">
          {/* Welcome section */}
          <section>
            <div className="mb-6 text-center">
              <h1 className="text-4xl font-bold mb-2">Welcome to WealthAI</h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Your AI-powered wealth management platform designed to help you provide exceptional service to your
                clients. Leverage advanced analytics and personalized insights to optimize client portfolios.
              </p>
            </div>

            {/* Statistics overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
              {todayHighlights.map((highlight, index) => (
                <Card key={index} className="bg-slate-900 border-slate-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-400">{highlight.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{highlight.value}</h3>
                      </div>
                      <div
                        className={`rounded-full p-2 ${
                          highlight.status === "up"
                            ? "bg-emerald-500/10"
                            : highlight.status === "down"
                              ? "bg-red-500/10"
                              : "bg-slate-500/10"
                        }`}
                      >
                        <highlight.icon
                          className={`h-5 w-5 ${
                            highlight.status === "up"
                              ? "text-emerald-500"
                              : highlight.status === "down"
                                ? "text-red-500"
                                : "text-slate-500"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          highlight.status === "up"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : highlight.status === "down"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-slate-500/10 text-slate-500"
                        }
                        border-none
                      `}
                      >
                        {highlight.trend}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Select wealth manager section */}
          <section className="mb-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Select Your Profile</h2>
              <p className="text-slate-400">Choose your profile to continue</p>
            </div>

            <div className="mb-4">
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {filteredManagers.map((manager) => (
                <Card
                  key={manager.id}
                  className={`cursor-pointer transition-all bg-slate-900 border-slate-800 hover:border-[#af2018] ${
                    selectedManager === manager.id ? "border-[#af2018] ring-1 ring-[#af2018]" : ""
                  }`}
                  onClick={() => setSelectedManager(manager.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={manager.avatar} alt={manager.name} />
                        <AvatarFallback>{manager.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{manager.name}</h3>
                        <p className="text-slate-400">{manager.title}</p>
                        <div className="flex gap-2 mt-2 text-xs">
                          <Badge variant="outline" className="bg-slate-800 border-slate-700">
                            {manager.clients} Clients
                          </Badge>
                          <Badge variant="outline" className="bg-slate-800 border-slate-700">
                            {manager.aum} AUM
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                className="bg-[#af2018] hover:bg-[#8a1a13]"
                size="lg"
                onClick={() => onEnterDashboard(selectedManager || undefined)}
              >
                Enter Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Quick access section */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Quick Services</h2>
              <p className="text-slate-400">Frequent services and tools</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {quickServices.map((service, index) => (
                <Card key={index} className="bg-slate-900 border-slate-800 cursor-pointer hover:border-slate-700">
                  <CardContent className="p-4">
                    <div className={`rounded-full ${service.color} w-12 h-12 flex items-center justify-center mb-4`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold mb-1">{service.title}</h3>
                    <p className="text-sm text-slate-400">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-slate-800 text-center">
        <p className="text-sm text-slate-400">© 2025 WealthAI. All rights reserved. Powered by SIX.</p>
      </footer>
    </div>
  )
}

