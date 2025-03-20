"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Info,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageSquare,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Chart } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DashboardView() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
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
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <PieChart className="h-5 w-5" />
                Portfolio
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
                Tax Optimization
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
                placeholder="Search clients, assets, or insights..."
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
      <div className="flex flex-1">
        <aside className="hidden w-[280px] flex-col border-r bg-background md:flex">
          <nav className="grid gap-2 p-4 text-sm">
            <a href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <PieChart className="h-4 w-4" />
              Portfolio
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <ShieldAlert className="h-4 w-4" />
              Risk Management
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <DollarSign className="h-4 w-4" />
              Tax Optimization
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Clients
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              Reports
            </a>
            <Separator className="my-2" />
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </a>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, your AI-powered insights are ready.</p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="hidden sm:inline">Last 30 days</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                    <DropdownMenuItem>Last year</DropdownMenuItem>
                    <DropdownMenuItem>All time</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Custom range</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="risk">Risk Mitigation</TabsTrigger>
                <TabsTrigger value="tax">Tax Optimization</TabsTrigger>
                <TabsTrigger value="clients">Client Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$12.4M</div>
                      <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Portfolio Performance</CardTitle>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+8.2%</div>
                      <p className="text-xs text-muted-foreground">+2.1% above benchmark</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Low</div>
                      <p className="text-xs text-muted-foreground">-5% volatility vs market</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tax Efficiency</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">+4% from previous year</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center">
                      <div className="grid gap-1">
                        <CardTitle>Portfolio Performance</CardTitle>
                        <CardDescription>Real-time analytics across all client portfolios</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Download data</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Chart
                        type="line"
                        options={{
                          chart: {
                            toolbar: {
                              show: false,
                            },
                          },
                          xaxis: {
                            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                            labels: {
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                            },
                            axisBorder: {
                              show: false,
                            },
                            axisTicks: {
                              show: false,
                            },
                          },
                          yaxis: {
                            labels: {
                              style: {
                                colors: "hsl(var(--muted-foreground))",
                                fontFamily: "var(--font-sans)",
                              },
                              formatter: (value) => `${value}%`,
                            },
                          },
                          tooltip: {
                            theme: "dark",
                          },
                          grid: {
                            borderColor: "hsl(var(--border))",
                            xaxis: {
                              lines: {
                                show: true,
                              },
                            },
                            yaxis: {
                              lines: {
                                show: true,
                              },
                            },
                          },
                          stroke: {
                            curve: "smooth",
                          },
                          legend: {
                            position: "top",
                            horizontalAlign: "right",
                            labels: {
                              colors: "hsl(var(--foreground))",
                            },
                          },
                        }}
                        series={[
                          {
                            name: "Portfolio",
                            data: [5.2, 6.4, 8.1, 7.8, 9.2, 10.1, 9.8, 11.2, 12.5],
                            color: "hsl(var(--primary))",
                          },
                          {
                            name: "Benchmark",
                            data: [4.8, 5.2, 6.5, 6.2, 7.5, 8.0, 7.5, 8.9, 9.2],
                            color: "hsl(var(--muted-foreground))",
                          },
                        ]}
                        height={350}
                      />
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>AI Insights</CardTitle>
                      <CardDescription>Real-time recommendations based on market conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div className="grid gap-1">
                            <h3 className="font-medium leading-none">Reallocation Opportunity</h3>
                            <p className="text-sm text-muted-foreground">
                              Consider shifting 5% from US Large Cap to Emerging Markets to capitalize on current
                              valuations.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                View Analysis
                              </Button>
                              <Button size="sm">Apply</Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-lg border p-3">
                          <div className="rounded-full bg-amber-500/10 p-2">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          </div>
                          <div className="grid gap-1">
                            <h3 className="font-medium leading-none">Risk Alert</h3>
                            <p className="text-sm text-muted-foreground">
                              Increased volatility detected in technology sector. Consider hedging strategies for
                              affected portfolios.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">Take Action</Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-lg border p-3">
                          <div className="rounded-full bg-emerald-500/10 p-2">
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                          </div>
                          <div className="grid gap-1">
                            <h3 className="font-medium leading-none">Tax Optimization</h3>
                            <p className="text-sm text-muted-foreground">
                              Tax-loss harvesting opportunity identified in 3 client portfolios. Potential savings of
                              $24,500.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                View Clients
                              </Button>
                              <Button size="sm">Review</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Asset Allocation</CardTitle>
                      <CardDescription>Current allocation across all portfolios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Chart
                        type="donut"
                        options={{
                          labels: ["Equities", "Fixed Income", "Alternatives", "Cash"],
                          colors: [
                            "hsl(var(--primary))",
                            "hsl(var(--secondary))",
                            "hsl(var(--accent))",
                            "hsl(var(--muted))",
                          ],
                          legend: {
                            position: "bottom",
                            labels: {
                              colors: "hsl(var(--foreground))",
                            },
                          },
                          tooltip: {
                            theme: "dark",
                          },
                          plotOptions: {
                            pie: {
                              donut: {
                                labels: {
                                  show: true,
                                  name: {
                                    show: true,
                                  },
                                  value: {
                                    show: true,
                                    formatter: (val) => `${val}%`,
                                  },
                                  total: {
                                    show: true,
                                    label: "Total",
                                    formatter: () => "100%",
                                  },
                                },
                              },
                            },
                          },
                        }}
                        series={[45, 30, 15, 10]}
                        height={300}
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Activity</CardTitle>
                      <CardDescription>Recent client interactions and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">John Doe</p>
                            <p className="text-sm text-muted-foreground">Requested portfolio review</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                          <Button size="sm" variant="outline" className="ml-auto">
                            View
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>AS</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">Alice Smith</p>
                            <p className="text-sm text-muted-foreground">Updated risk profile</p>
                            <p className="text-xs text-muted-foreground">Yesterday</p>
                          </div>
                          <Button size="sm" variant="outline" className="ml-auto">
                            View
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">Robert Johnson</p>
                            <p className="text-sm text-muted-foreground">Scheduled annual review</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                          <Button size="sm" variant="outline" className="ml-auto">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Insights</CardTitle>
                      <CardDescription>Latest market trends and analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">S&P 500</h3>
                            <div className="flex items-center gap-1 text-emerald-500">
                              <TrendingUp className="h-4 w-4" />
                              <span>1.2%</span>
                            </div>
                          </div>
                          <Progress value={65} className="h-2" />
                          <p className="text-xs text-muted-foreground">Strong earnings driving market gains</p>
                        </div>
                        <div className="grid gap-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">10-Year Treasury</h3>
                            <div className="flex items-center gap-1 text-red-500">
                              <TrendingDown className="h-4 w-4" />
                              <span>0.5%</span>
                            </div>
                          </div>
                          <Progress value={42} className="h-2" />
                          <p className="text-xs text-muted-foreground">Yields falling on inflation expectations</p>
                        </div>
                        <div className="grid gap-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Emerging Markets</h3>
                            <div className="flex items-center gap-1 text-emerald-500">
                              <TrendingUp className="h-4 w-4" />
                              <span>2.8%</span>
                            </div>
                          </div>
                          <Progress value={78} className="h-2" />
                          <p className="text-xs text-muted-foreground">Outperforming on currency strength</p>
                        </div>
                        <Button variant="outline" className="w-full">
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          View Full Market Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="portfolio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Management</CardTitle>
                    <CardDescription>
                      Real-time portfolio performance analytics and AI-generated recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Total AUM</div>
                        <div className="text-3xl font-bold">$12.4M</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">YTD Performance</div>
                        <div className="text-3xl font-bold text-emerald-500">+8.2%</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Benchmark Diff</div>
                        <div className="text-3xl font-bold text-emerald-500">+2.1%</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Risk-Adjusted Return</div>
                        <div className="text-3xl font-bold">1.42</div>
                      </div>
                    </div>

                    <div className="rounded-lg border">
                      <div className="p-6">
                        <h3 className="text-lg font-medium">Asset Allocation</h3>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                          <div>
                            <Chart
                              type="donut"
                              options={{
                                labels: ["Equities", "Fixed Income", "Alternatives", "Cash"],
                                colors: [
                                  "hsl(var(--primary))",
                                  "hsl(var(--secondary))",
                                  "hsl(var(--accent))",
                                  "hsl(var(--muted))",
                                ],
                                legend: {
                                  position: "bottom",
                                  labels: {
                                    colors: "hsl(var(--foreground))",
                                  },
                                },
                                tooltip: {
                                  theme: "dark",
                                },
                                plotOptions: {
                                  pie: {
                                    donut: {
                                      labels: {
                                        show: true,
                                        name: {
                                          show: true,
                                        },
                                        value: {
                                          show: true,
                                          formatter: (val) => `${val}%`,
                                        },
                                        total: {
                                          show: true,
                                          label: "Total",
                                          formatter: () => "100%",
                                        },
                                      },
                                    },
                                  },
                                },
                              }}
                              series={[45, 30, 15, 10]}
                              height={300}
                            />
                          </div>
                          <div className="flex flex-col justify-center space-y-4">
                            <div className="rounded-lg border bg-muted/50 p-4">
                              <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-2">
                                  <LineChart className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">AI Recommendation</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Current allocation is overweight in US equities. Consider rebalancing 5% to emerging
                                    markets for better diversification.
                                  </p>
                                  <div className="mt-2 flex gap-2">
                                    <Button size="sm" variant="outline">
                                      View Analysis
                                    </Button>
                                    <Button size="sm">Apply Changes</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg border bg-muted/50 p-4">
                              <div className="flex items-start gap-4">
                                <div className="rounded-full bg-amber-500/10 p-2">
                                  <Info className="h-4 w-4 text-amber-500" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Market Insight</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Fixed income yields are rising. Consider shortening duration in bond holdings to
                                    reduce interest rate risk.
                                  </p>
                                  <div className="mt-2">
                                    <Button size="sm" variant="outline">
                                      Learn More
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border">
                      <div className="p-6">
                        <h3 className="text-lg font-medium">Top Holdings</h3>
                        <div className="mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Asset</TableHead>
                                <TableHead>Allocation</TableHead>
                                <TableHead>Performance</TableHead>
                                <TableHead>Risk Score</TableHead>
                                <TableHead>Recommendation</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">US Large Cap Equity</TableCell>
                                <TableCell>28.5%</TableCell>
                                <TableCell className="text-emerald-500">+12.4%</TableCell>
                                <TableCell>Medium</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                                    Reduce
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">US Corporate Bonds</TableCell>
                                <TableCell>22.3%</TableCell>
                                <TableCell className="text-red-500">-2.1%</TableCell>
                                <TableCell>Low</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                                    Hold
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">International Developed</TableCell>
                                <TableCell>15.8%</TableCell>
                                <TableCell className="text-emerald-500">+6.7%</TableCell>
                                <TableCell>Medium</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                                    Hold
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Emerging Markets</TableCell>
                                <TableCell>8.2%</TableCell>
                                <TableCell className="text-emerald-500">+14.2%</TableCell>
                                <TableCell>High</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                                    Increase
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Real Estate</TableCell>
                                <TableCell>7.5%</TableCell>
                                <TableCell className="text-red-500">-4.3%</TableCell>
                                <TableCell>Medium</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                                    Reduce
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="risk" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Mitigation</CardTitle>
                    <CardDescription>Instant alerts and predictive analytics to manage portfolio risks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Overall Risk Score</div>
                        <div className="text-3xl font-bold">Low</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Volatility</div>
                        <div className="text-3xl font-bold">8.4%</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Drawdown</div>
                        <div className="text-3xl font-bold">-5.2%</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">VaR (95%)</div>
                        <div className="text-3xl font-bold">$420K</div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-destructive/5 p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-destructive/10 p-2">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Critical Risk Alert</h3>
                          <p className="text-muted-foreground mt-1">
                            Increased volatility detected in technology sector affecting 12 client portfolios. AI
                            analysis suggests potential 15% drawdown if left unaddressed.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button variant="destructive">View Affected Portfolios</Button>
                            <Button variant="outline">Dismiss</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Risk Exposure</CardTitle>
                          <CardDescription>Current exposure by risk category</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Chart
                            type="radar"
                            options={{
                              chart: {
                                toolbar: {
                                  show: false,
                                },
                              },
                              xaxis: {
                                categories: [
                                  "Market",
                                  "Credit",
                                  "Liquidity",
                                  "Operational",
                                  "Regulatory",
                                  "Concentration",
                                ],
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
                                size: 4,
                              },
                              tooltip: {
                                theme: "dark",
                              },
                              grid: {
                                borderColor: "hsl(var(--border))",
                              },
                              legend: {
                                position: "bottom",
                                labels: {
                                  colors: "hsl(var(--foreground))",
                                },
                              },
                            }}
                            series={[
                              {
                                name: "Current",
                                data: [65, 40, 35, 25, 30, 55],
                                color: "hsl(var(--primary))",
                              },
                              {
                                name: "Target",
                                data: [45, 45, 30, 30, 30, 40],
                                color: "hsl(var(--muted-foreground))",
                              },
                            ]}
                            height={350}
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Predictive Risk Analysis</CardTitle>
                          <CardDescription>AI-powered forecasts of potential risks</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-destructive"></div>
                                <span className="text-sm font-medium">Interest Rate Risk</span>
                              </div>
                              <span className="text-sm font-medium">High</span>
                            </div>
                            <Progress value={85} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Fed policy shift expected in next quarter. Consider reducing duration.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                <span className="text-sm font-medium">Currency Risk</span>
                              </div>
                              <span className="text-sm font-medium">Medium</span>
                            </div>
                            <Progress value={60} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              USD strength impacting international holdings. Consider hedging strategies.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                <span className="text-sm font-medium">Liquidity Risk</span>
                              </div>
                              <span className="text-sm font-medium">Low</span>
                            </div>
                            <Progress value={25} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Portfolio maintains adequate liquidity for current market conditions.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                <span className="text-sm font-medium">Sector Concentration</span>
                              </div>
                              <span className="text-sm font-medium">Medium</span>
                            </div>
                            <Progress value={55} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Technology sector overweight. Consider diversifying to reduce concentration risk.
                            </p>
                          </div>
                          <Button className="w-full">Generate Comprehensive Risk Report</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tax" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Optimization</CardTitle>
                    <CardDescription>AI-powered suggestions for tax-efficient investment strategies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Tax Efficiency Score</div>
                        <div className="text-3xl font-bold">92%</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Est. Tax Savings</div>
                        <div className="text-3xl font-bold text-emerald-500">$86,500</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Harvest Opportunities</div>
                        <div className="text-3xl font-bold">8</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Tax-Loss Carryforward</div>
                        <div className="text-3xl font-bold">$124K</div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-emerald-500/5 p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-emerald-500/10 p-2">
                          <DollarSign className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Tax-Loss Harvesting Opportunity</h3>
                          <p className="text-muted-foreground mt-1">
                            AI has identified 3 client portfolios with significant tax-loss harvesting opportunities.
                            Estimated tax savings of $24,500 if implemented before end of quarter.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button className="bg-emerald-600 hover:bg-emerald-700">View Opportunities</Button>
                            <Button variant="outline">Schedule for Later</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Tax-Efficient Asset Location</CardTitle>
                          <CardDescription>Optimal placement of assets across account types</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Chart
                            type="bar"
                            options={{
                              chart: {
                                stacked: true,
                                toolbar: {
                                  show: false,
                                },
                              },
                              plotOptions: {
                                bar: {
                                  horizontal: true,
                                },
                              },
                              xaxis: {
                                categories: ["Taxable", "Tax-Deferred", "Tax-Exempt"],
                                labels: {
                                  style: {
                                    colors: "hsl(var(--muted-foreground))",
                                    fontFamily: "var(--font-sans)",
                                  },
                                },
                              },
                              yaxis: {
                                labels: {
                                  style: {
                                    colors: "hsl(var(--muted-foreground))",
                                    fontFamily: "var(--font-sans)",
                                  },
                                },
                              },
                              tooltip: {
                                theme: "dark",
                              },
                              grid: {
                                borderColor: "hsl(var(--border))",
                              },
                              legend: {
                                position: "bottom",
                                labels: {
                                  colors: "hsl(var(--foreground))",
                                },
                              },
                            }}
                            series={[
                              {
                                name: "Equities",
                                data: [20, 35, 45],
                                color: "hsl(var(--primary))",
                              },
                              {
                                name: "Fixed Income",
                                data: [45, 40, 15],
                                color: "hsl(var(--secondary))",
                              },
                              {
                                name: "Alternatives",
                                data: [25, 15, 10],
                                color: "hsl(var(--accent))",
                              },
                              {
                                name: "Cash",
                                data: [10, 10, 30],
                                color: "hsl(var(--muted))",
                              },
                            ]}
                            height={300}
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Tax Optimization Recommendations</CardTitle>
                          <CardDescription>AI-generated strategies to improve tax efficiency</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <h4 className="font-medium">Move Municipal Bonds</h4>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Relocate municipal bonds from tax-deferred to taxable accounts for 5 clients to optimize
                              tax-efficiency.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">Apply</Button>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <h4 className="font-medium">Harvest Losses in Tech</h4>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Sell underperforming tech positions and replace with similar ETFs to maintain exposure
                              while capturing tax losses.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">Apply</Button>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <h4 className="font-medium">Charitable Giving Strategy</h4>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Identify appreciated securities for charitable donations to maximize tax benefits for 3
                              high-net-worth clients.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">Apply</Button>
                            </div>
                          </div>
                          <Button className="w-full">Generate Tax Optimization Report</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="clients" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Insights</CardTitle>
                    <CardDescription>Personalized client insights and communication tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xl font-medium">Client Overview</h3>
                        <p className="text-sm text-muted-foreground">
                          Managing 42 client relationships with $12.4M in assets
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-1">
                          <Filter className="h-4 w-4" />
                          Filter
                        </Button>
                        <Button className="gap-1">
                          <Plus className="h-4 w-4" />
                          Add Client
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>AUM</TableHead>
                            <TableHead>YTD Performance</TableHead>
                            <TableHead>Risk Profile</TableHead>
                            <TableHead>Next Review</TableHead>
                            <TableHead>AI Insights</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">John Doe</p>
                                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>$1.2M</TableCell>
                            <TableCell className="text-emerald-500">+9.4%</TableCell>
                            <TableCell>Moderate</TableCell>
                            <TableCell>Apr 15, 2023</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                                Rebalance Needed
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">Alice Smith</p>
                                  <p className="text-xs text-muted-foreground">alice.smith@example.com</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>$2.8M</TableCell>
                            <TableCell className="text-emerald-500">+7.2%</TableCell>
                            <TableCell>Conservative</TableCell>
                            <TableCell>May 3, 2023</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                                Tax Opportunity
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>RJ</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">Robert Johnson</p>
                                  <p className="text-xs text-muted-foreground">robert.j@example.com</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>$3.5M</TableCell>
                            <TableCell className="text-emerald-500">+10.1%</TableCell>
                            <TableCell>Aggressive</TableCell>
                            <TableCell>Apr 28, 2023</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-destructive/10 text-destructive">
                                Risk Alert
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>EW</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">Emily Wilson</p>
                                  <p className="text-xs text-muted-foreground">emily.w@example.com</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>$950K</TableCell>
                            <TableCell className="text-emerald-500">+6.8%</TableCell>
                            <TableCell>Moderate</TableCell>
                            <TableCell>May 12, 2023</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                Review Due
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Client Communication</CardTitle>
                          <CardDescription>AI-generated summaries and communication tools</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <h4 className="font-medium">Quarterly Review Templates</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              AI-generated personalized review templates for upcoming client meetings.
                            </p>
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between rounded-md border p-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>Conservative Client Template</span>
                                </div>
                                <Button size="sm" variant="ghost">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between rounded-md border p-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>Moderate Client Template</span>
                                </div>
                                <Button size="sm" variant="ghost">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between rounded-md border p-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>Aggressive Client Template</span>
                                </div>
                                <Button size="sm" variant="ghost">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <Button className="mt-4 w-full">Generate Custom Template</Button>
                          </div>
                          <div className="rounded-lg border p-4">
                            <h4 className="font-medium">Client Communication AI</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Generate personalized client communications with AI assistance.
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Button variant="outline" className="flex-1 gap-1">
                                <MessageSquare className="h-4 w-4" />
                                Email
                              </Button>
                              <Button variant="outline" className="flex-1 gap-1">
                                <FileText className="h-4 w-4" />
                                Report
                              </Button>
                              <Button className="flex-1 gap-1">
                                <Plus className="h-4 w-4" />
                                New
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Client Behavioral Insights</CardTitle>
                          <CardDescription>AI analysis of client preferences and behavior</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="rounded-lg border p-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">John Doe</h4>
                                  <div className="mt-2 space-y-2">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="text-muted-foreground">Risk Tolerance:</div>
                                      <div>Moderate, but decreasing with age</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="text-muted-foreground">Communication:</div>
                                      <div>Prefers detailed quarterly reviews</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="text-muted-foreground">Concerns:</div>
                                      <div>Retirement income, education funding</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="text-muted-foreground">Behavioral Bias:</div>
                                      <div>Loss aversion, recency bias</div>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex gap-2">
                                    <Button size="sm">View Full Profile</Button>
                                    <Button size="sm" variant="outline">
                                      Schedule Meeting
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg border p-4">
                              <h4 className="font-medium">AI Relationship Insights</h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                John shows signs of increased anxiety about market volatility. Consider proactive
                                communication about portfolio resilience and long-term strategy.
                              </p>
                              <div className="mt-3">
                                <Button size="sm" variant="outline">
                                  Generate Talking Points
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

