"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  FileText,
  Trophy,
  Download,
  Eye,
  MessageCircle,
  Share2,
  BarChart3,
  Heart,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const quickMetrics = [
  {
    title: "Total Posts",
    value: "247",
    change: "+12",
    changeType: "positive" as const,
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+23.7%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Engagement Rate",
    value: "12.4%",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Top Platform",
    value: "LinkedIn",
    change: "67% of reach",
    changeType: "neutral" as const,
    icon: Trophy,
    color: "text-success",
    bgColor: "bg-success/10",
  },
]

const chartData = [
  { date: "Jan 1", reach: 45000, engagement: 8.2, clicks: 1200, conversions: 89 },
  { date: "Jan 3", reach: 52000, engagement: 9.1, clicks: 1450, conversions: 102 },
  { date: "Jan 5", reach: 48000, engagement: 7.8, clicks: 1320, conversions: 95 },
  { date: "Jan 7", reach: 61000, engagement: 10.5, clicks: 1680, conversions: 124 },
  { date: "Jan 9", reach: 58000, engagement: 9.8, clicks: 1590, conversions: 118 },
  { date: "Jan 11", reach: 67000, engagement: 11.2, clicks: 1820, conversions: 135 },
  { date: "Jan 13", reach: 72000, engagement: 12.4, clicks: 1950, conversions: 142 },
  { date: "Jan 15", reach: 69000, engagement: 11.8, clicks: 1870, conversions: 138 },
  { date: "Jan 17", reach: 75000, engagement: 13.1, clicks: 2100, conversions: 156 },
  { date: "Jan 19", reach: 78000, engagement: 12.9, clicks: 2180, conversions: 162 },
  { date: "Jan 21", reach: 82000, engagement: 14.2, clicks: 2350, conversions: 178 },
  { date: "Jan 23", reach: 85000, engagement: 13.8, clicks: 2420, conversions: 185 },
  { date: "Jan 25", reach: 89000, engagement: 15.1, clicks: 2650, conversions: 198 },
  { date: "Jan 27", reach: 92000, engagement: 14.7, clicks: 2780, conversions: 205 },
  { date: "Jan 29", reach: 96000, engagement: 16.2, clicks: 2950, conversions: 224 },
]

const platforms = [
  { name: "Facebook", color: "#1877f2", active: true },
  { name: "Instagram", color: "#E4405F", active: true },
  { name: "LinkedIn", color: "#0077b5", active: true },
  { name: "Twitter", color: "#000000", active: false },
]

const platformData = [
  {
    platform: "LinkedIn",
    reach: 850000,
    engagement: 12.4,
    growth: 23.7,
    color: "#0077b5",
    icon: "💼",
  },
  {
    platform: "Instagram",
    reach: 620000,
    engagement: 8.9,
    growth: 18.2,
    color: "#E4405F",
    icon: "📸",
  },
  {
    platform: "Facebook",
    reach: 480000,
    engagement: 6.2,
    growth: 12.1,
    color: "#1877f2",
    icon: "👥",
  },
  {
    platform: "Twitter",
    reach: 320000,
    engagement: 4.8,
    growth: 8.5,
    color: "#000000",
    icon: "🐦",
  },
]

const ageData = [
  { name: "18-24", value: 15, color: "#6366f1" },
  { name: "25-34", value: 35, color: "#8b5cf6" },
  { name: "35-44", value: 28, color: "#06b6d4" },
  { name: "45-54", value: 15, color: "#10b981" },
  { name: "55+", value: 7, color: "#f59e0b" },
]

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30")
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms.filter((p) => p.active).map((p) => p.name))
  const [isExporting, setIsExporting] = useState(false)

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformName) ? prev.filter((p) => p !== platformName) : [...prev, platformName],
    )
  }

  const handleExport = async () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      // Simulate download
    }, 2000)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">📊 Analytics & Insights</h1>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48 bg-white/70 backdrop-blur-xl border-gray-100/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="gradient-primary text-white hover:shadow-xl transition-all duration-300"
          >
            {isExporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-8 md:grid-cols-4">
        {quickMetrics.map((metric, index) => (
          <Card
            key={metric.title}
            className="glass-card hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${metric.bgColor}`}>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                {metric.changeType === "positive" && (
                  <div className="flex items-center gap-1 text-success font-semibold text-sm">
                    <TrendingUp className="h-4 w-4" />
                    {metric.change}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-base font-semibold text-gray-600">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                {metric.changeType === "neutral" && <p className="text-sm text-gray-500">{metric.change}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader className="pb-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold text-gray-800">Performance Trends</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent hover:bg-muted/50">
                    Zoom
                  </Button>
                </div>
              </div>

              {/* Platform Filters */}
              <div className="flex flex-wrap gap-3 mt-6">
                {platforms.map((platform) => (
                  <Button
                    key={platform.name}
                    variant={selectedPlatforms.includes(platform.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePlatform(platform.name)}
                    className={`transition-all duration-200 ${
                      selectedPlatforms.includes(platform.name)
                        ? platform.name === "Instagram"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                          : "hover:shadow-lg"
                        : "bg-transparent hover:bg-muted/50"
                    }`}
                    style={{
                      backgroundColor:
                        selectedPlatforms.includes(platform.name) && platform.name !== "Instagram"
                          ? platform.color
                          : undefined,
                      color: selectedPlatforms.includes(platform.name) ? "white" : undefined,
                    }}
                  >
                    {platform.name}
                  </Button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-10">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px 0 rgba(99, 102, 241, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="reach"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="url(#reachGradient)"
                      name="Reach"
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#engagementGradient)"
                      name="Engagement %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-gray-600">Reach</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  <span className="text-sm font-medium text-gray-600">Engagement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Top Performing Content */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />🏆 Top Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-6">
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-white/50 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-gradient-primary/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      🎥
                    </div>
                    <p className="text-sm font-medium">Behind the scenes video</p>
                  </div>
                </div>

                {/* Content info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Instagram</Badge>
                    <Badge className="bg-blue-600 text-white">LinkedIn</Badge>
                  </div>

                  <h4 className="font-semibold text-gray-900 text-sm">
                    "Behind the scenes: How we built our AI-powered social media tool"
                  </h4>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                        <Heart className="h-4 w-4" />
                        <span className="font-semibold">12.4K</span>
                      </div>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="font-semibold">892</span>
                      </div>
                      <p className="text-xs text-gray-500">Comments</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                        <Share2 className="h-4 w-4" />
                        <span className="font-semibold">456</span>
                      </div>
                      <p className="text-xs text-gray-500">Shares</p>
                    </div>
                  </div>

                  {/* Engagement rate */}
                  <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-xl">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="font-semibold text-success">89% Engagement Rate</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audience Demographics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Audience Age
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {ageData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform Performance */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-secondary" />
            Platform Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {platformData.map((platform) => (
              <div
                key={platform.platform}
                className="p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{platform.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{platform.platform}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {(platform.reach / 1000).toFixed(0)}K
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {platform.engagement}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className="bg-success/10 text-success font-semibold">
                    <TrendingUp className="h-3 w-3 mr-1" />+{platform.growth}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
