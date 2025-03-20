"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  DollarSign,
  FileText,
  LineChart,
  Menu,
  PieChart,
  Settings,
  ShieldAlert,
  User,
  Users,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useIsMobile } from "@/hooks/use-mobile"
import { Chart } from "@/components/ui/chart"
import { useClientSelection } from "@/hooks/useClientSelection"
import { useAIChat } from "@/hooks/useAIChat"
import { AIChat } from "@/components/AIChat"
import { ClientInfo } from "@/components/ClientInfo"
import { DetailedCustomerInfo } from "@/components/DetailedCustomerInfo"
import { AIRecommendedActions } from "@/components/AIRecommendedActions"
import { EnlargedView } from "@/components/EnlargedView"
import { Progress } from "@/components/ui/progress"
import { NotificationsPopover } from "@/components/NotificationsPopover"

// Add import for format function
import { format } from "date-fns"

// Add import for MeetingScheduler component
import { MeetingScheduler } from "@/components/MeetingScheduler"

export default function FinanceBroDashboard() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState("insights")
  const [enlargedBox, setEnlargedBox] = useState<string | null>(null)

  const { selectedClientId, clientData, clientSearchQuery, filteredClients, handleClientChange, setClientSearchQuery } =
    useClientSelection()

  const {
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
  } = useAIChat(clientData)

  const toggleEnlargeBox = (boxId: string | null) => {
    setEnlargedBox(enlargedBox === boxId ? null : boxId)
  }

  const marketData = {
    indices: {
      sp500: {
        value: "4,500",
        change: 0.5,
        status: "up",
      },
      nasdaq: {
        value: "14,000",
        change: 0.8,
        status: "up",
      },
      dowJones: {
        value: "34,500",
        change: -0.2,
        status: "down",
      },
      russell2000: {
        value: "2,000",
        change: 0.3,
        status: "up",
      },
    },
  }

  // Add state for meeting scheduler
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false)

  // Add functions to handle meetings
  const handleScheduleMeeting = (date: Date, title: string, notes: string) => {
    // In a real app, this would call an API to save the meeting
    console.log("Scheduling meeting:", { date, title, notes, client: clientData.name })

    // For demo purposes, we'll just add it to the client's upcoming events
    const newEvent = {
      date: format(date, "MMM d, yyyy"),
      title: title,
    }

    // This is just for UI demonstration - in a real app, you'd update the backend
    clientData.upcomingEvents = [newEvent, ...clientData.upcomingEvents]
  }

  const handleCancelMeeting = (index: number) => {
    // In a real app, this would call an API to cancel the meeting
    console.log("Cancelling meeting at index:", index)

    // For demo purposes, we'll just remove it from the client's upcoming events
    // This is just for UI demonstration - in a real app, you'd update the backend
    clientData.upcomingEvents = clientData.upcomingEvents.filter((_, i) => i !== index)
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background dark">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-slate-900 px-4 md:px-6 dark:bg-slate-900 light:bg-white light:border-slate-200">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden dark:bg-slate-800 dark:border-slate-700 light:bg-white light:border-slate-200"
            >
              <Menu className="h-5 w-5 dark:text-white light:text-slate-900" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 dark:bg-slate-900 dark:text-white light:bg-white light:text-slate-900"
          >
            <nav className="grid gap-2 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <LineChart className="h-6 w-6" />
                <span className="font-bold">FinanceBro</span>
              </a>
              <Separator className="my-2 dark:bg-slate-800 light:bg-slate-200" />
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg dark:bg-slate-800 light:bg-slate-100 px-3 py-2 text-primary"
              >
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
          <span className="font-bold hidden md:inline-block dark:text-white light:text-slate-900">FinanceBro</span>
        </a>

        {/* SIX logo */}
        <div className="flex items-center mx-2">
          <img src="/images/six-logo.png" alt="SIX Group" className="h-6" />
        </div>

        {/* Full-width AI search bar */}
        <div className="flex-1 px-2">
          <div className="relative w-full cursor-pointer" onClick={toggleAIChat}>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-[#af2018]" />
              </div>
              <div className="w-full rounded-lg dark:bg-slate-800 dark:border-slate-700 light:bg-slate-100 light:border-slate-200 border py-2 pl-10 pr-4 dark:text-white light:text-slate-900">
                Ask FinanceBro anything about {clientData.name}...
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <NotificationsPopover />
                </div>
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
            <DropdownMenuContent
              align="end"
              className="dark:bg-slate-800 dark:text-white dark:border-slate-700 light:bg-white light:text-slate-900 light:border-slate-200"
            >
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
        <AIChat
          clientData={clientData}
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          selectedMainPreset={selectedMainPreset}
          showRefinedPresets={showRefinedPresets}
          setInputValue={setInputValue}
          toggleAIChat={toggleAIChat}
          handleSubmitMessage={handleSubmitMessage}
          handleActionClick={handleActionClick}
          handleMainPresetSelect={handleMainPresetSelect}
          handleRefinedPresetSelect={handleRefinedPresetSelect}
          resetPresetSelection={resetPresetSelection}
          resetChat={resetChat}
        />
      )}

      <div className="flex flex-1 overflow-hidden bg-slate-950">
        {/* Sidebar */}
        <aside className="hidden w-[280px] flex-col border-r border-slate-800 bg-slate-900 md:flex">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
                  >
                    <span>Clients</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[280px] dark:bg-slate-800 dark:border-slate-700 dark:text-white light:bg-white light:text-slate-900 light:border-slate-200"
                >
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

            <ClientInfo client={clientData} />

            <Separator className="my-4 bg-slate-800" />

            <nav className="grid gap-2 text-sm">
              <Button
                variant={activeTab === "insights" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "insights" ? "bg-[#af2018] text-white hover:bg-[#8a1a13]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("insights")}
              >
                <LineChart className="mr-2 h-4 w-4" />
                AI Insights
              </Button>
              <Button
                variant={activeTab === "portfolio" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "portfolio" ? "bg-[#af2018] text-white hover:bg-[#8a1a13]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("portfolio")}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
              <Button
                variant={activeTab === "risk" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "risk" ? "bg-[#af2018] text-white hover:bg-[#8a1a13]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("risk")}
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                Risk Management
              </Button>
              <Button
                variant={activeTab === "tax" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "tax" ? "bg-[#af2018] text-white hover:bg-[#8a1a13]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("tax")}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Tax Planning
              </Button>
              <Button
                variant={activeTab === "retirement" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "retirement" ? "bg-[#af2018] text-white hover:bg-[#8a1a13]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                onClick={() => setActiveTab("retirement")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Retirement
              </Button>
              <Button
                variant={activeTab === "market" ? "secondary" : "ghost"}
                className={`justify-start ${activeTab === "market" ? "bg-[#af2018] text-white hover:bg-[#8a1a13]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
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
                  {filteredClients.map((client) => (
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
                  <TabsTrigger value="insights" className="data-[state=active]:bg-[#af2018]">
                    Insights
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#af2018]">
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger value="market" className="data-[state=active]:bg-[#af2018]">
                    Market
                  </TabsTrigger>
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
                <DetailedCustomerInfo
                  client={clientData}
                  isEnlarged={enlargedBox === "customerInfo"}
                  onToggleEnlarge={() => toggleEnlargeBox("customerInfo")}
                  onActionClick={handleActionButtonClick}
                />

                {/* Box 2: Calendar */}
                <Card className="bg-slate-900 border-slate-800 text-white shadow-md">
                  <CardHeader className="pb-2 border-b border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Calendar</CardTitle>
                        <CardDescription className="text-slate-400">Recent and upcoming interactions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 px-3">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-[#af2018]">Recent Interactions</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {new Date(2025, 2, 20).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-400">{clientData.recentActivity}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {new Date(2025, 2, 6).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-400">Quarterly portfolio review call</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-slate-800" />

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-[#af2018]">Upcoming Meetings</h4>
                        <div className="space-y-3">
                          {clientData.upcomingEvents.slice(0, 2).map((event, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-[#af2018] mt-0.5 flex-shrink-0" />
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
                      onClick={() => setShowMeetingScheduler(true)}
                    >
                      Schedule Meeting
                    </Button>
                  </CardFooter>
                </Card>

                {/* Box 3: AI-recommended Actions */}
                <AIRecommendedActions
                  client={clientData}
                  isEnlarged={enlargedBox === "actions"}
                  onToggleEnlarge={() => toggleEnlargeBox("actions")}
                  onActionClick={handleActionButtonClick}
                />
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
                      onClick={() =>
                        handleActionButtonClick(
                          "Provide a detailed portfolio performance analysis for " +
                            clientData.name +
                            " including sector breakdown, historical performance, and benchmark comparison",
                        )
                      }
                    >
                      View Detailed Analysis
                    </Button>
                  </CardFooter>
                </Card>

                {/* Additional tiles would go here */}
                {/* ... */}
                {/* Tile 2: Risk Assessment */}
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">What's my current risk exposure?</CardTitle>
                        <CardDescription className="text-slate-400">Risk assessment</CardDescription>
                      </div>
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
                        Your technology sector concentration ({clientData.sectors.technology}%) is higher than
                        recommended for your risk profile. Consider rebalancing to reduce this exposure.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-200"
                      onClick={() =>
                        handleActionButtonClick(
                          "Generate a comprehensive risk mitigation plan for " +
                            clientData.name +
                            " addressing all identified risk factors",
                        )
                      }
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
                      onClick={() =>
                        handleActionButtonClick(
                          "Create a detailed tax optimization strategy for " +
                            clientData.name +
                            " with specific action items and estimated savings",
                        )
                      }
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
                                colors: "#ffffff",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          yaxis: {
                            labels: {
                              formatter: (value) => `$${(value / 1000000).toFixed(1)}M`,
                              style: {
                                colors: "#ffffff",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                          },
                          colors: ["#af2018", "#f5a623"],
                          tooltip: {
                            theme: "dark",
                          },
                          legend: {
                            position: "top",
                            labels: {
                              colors: "#ffffff",
                            },
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
                      onClick={() =>
                        handleActionButtonClick(
                          "Analyze and adjust the retirement plan for " +
                            clientData.name +
                            " with multiple scenarios and recommendations",
                        )
                      }
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md bg-slate-700 p-3">
                        <h4 className="text-sm font-medium mb-1 text-white">Top Opportunities:</h4>
                        <ul className="text-sm space-y-2 text-slate-400">
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5">
                              <div className="rounded-full bg-emerald-500/20 p-1.5">
                                <DollarSign className="h-4 w-4 text-emerald-500" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-white">Healthcare sector allocation</p>
                              <p>
                                Increase exposure to healthcare innovation funds given positive sector outlook and aging
                                demographics.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5">
                              <div className="rounded-full bg-emerald-500/20 p-1.5">
                                <DollarSign className="h-4 w-4 text-emerald-500" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-white">Fixed income reallocation</p>
                              <p>
                                Shift from long-term to short/medium-term bonds to reduce interest rate risk in current
                                environment.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5">
                              <div className="rounded-full bg-emerald-500/20 p-1.5">
                                <DollarSign className="h-4 w-4 text-emerald-500" />
                              </div>
                            </div>
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
                      onClick={() =>
                        handleActionButtonClick(
                          "Create a detailed investment plan for " +
                            clientData.name +
                            " with specific allocation recommendations and expected outcomes",
                        )
                      }
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
                      onClick={() =>
                        handleActionButtonClick(
                          "Generate a comprehensive market report with analysis of how current conditions impact " +
                            clientData.name +
                            "'s portfolio",
                        )
                      }
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

      {/* Meeting scheduler dialog */}
      <MeetingScheduler
        isOpen={showMeetingScheduler}
        onClose={() => setShowMeetingScheduler(false)}
        clientName={clientData.name}
        recentMeetings={[
          { date: new Date(2025, 2, 15), title: "Quarterly Portfolio Review" },
          { date: new Date(2025, 1, 5), title: "Tax Planning Session" },
        ]}
        upcomingMeetings={clientData.upcomingEvents.map((event) => ({
          date: new Date(event.date),
          title: event.title,
        }))}
        onScheduleMeeting={handleScheduleMeeting}
        onCancelMeeting={handleCancelMeeting}
      />

      {/* Enlarged view component */}
      <EnlargedView
        boxType={enlargedBox}
        client={clientData}
        onClose={() => toggleEnlargeBox(null)}
        onActionClick={handleActionButtonClick}
      />
    </div>
  )
}

