"use client"

import { useAnalyticsStore } from "@/lib/analytics-store"
import ContentPerformanceTable from "./content-performance-table"
import PlatformComparisonCard from "./platform-comparison-card"
import PerformanceTimelineChart from "./performance-timeline-chart"
import PerformanceMetricCard from "./performance-metric-card"
import { DateRangePicker } from "@/components/ui/date-range-picker"
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

const performanceMetrics = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+15.3%",
    trend: "up",
    data: [65, 75, 80, 85, 90, 95, 100], // For mini chart
    color: "primary"
  },
  {
    title: "Engagement Rate",
    value: "8.2%",
    change: "+2.1%",
    trend: "up",
    data: [45, 52, 48, 61, 55, 67, 82],
    color: "secondary"
  },
  {
    title: "Click-Through Rate",
    value: "3.4%",
    change: "-0.5%",
    trend: "down",
    data: [12, 15, 18, 14, 16, 13, 34],
    color: "accent"
  },
  {
    title: "Follower Growth",
    value: "+1,247",
    change: "+12.8%",
    trend: "up",
    data: [100, 120, 140, 180, 200, 220, 247],
    color: "success"
  },
  {
    title: "Content Created",
    value: "47",
    change: "This month",
    trend: "neutral",
    data: [5, 8, 12, 15, 18, 22, 47],
    color: "warning"
  },
  {
    title: "AI Credits Used",
    value: "850/1,250",
    change: "68% used",
    trend: "neutral",
    data: [100, 200, 350, 500, 650, 750, 850],
    color: "info"
  }
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

const platformData = [
    { name: "LinkedIn", followers: "1.2M", reach: "850K", engagement: "12.4%", performance: 85, bgColor: "bg-blue-100", iconColor: "text-blue-600", progressColor: "bg-blue-600", icon: Users },
    { name: "Instagram", followers: "2.4M", reach: "1.8M", engagement: "25.8%", performance: 92, bgColor: "bg-pink-100", iconColor: "text-pink-600", progressColor: "bg-pink-600", icon: Users },
    { name: "Facebook", followers: "800K", reach: "450K", engagement: "10.5%", performance: 78, bgColor: "bg-indigo-100", iconColor: "text-indigo-600", progressColor: "bg-indigo-600", icon: Users },
    { name: "Twitter", followers: "500K", reach: "320K", engagement: "8.9%", performance: 72, bgColor: "bg-sky-100", iconColor: "text-sky-600", progressColor: "bg-sky-600", icon: Users },
]

const ageData = [
  { name: "18-24", value: 15, color: "#6366f1" },
  { name: "25-34", value: 35, color: "#8b5cf6" },
  { name: "35-44", value: 28, color: "#06b6d4" },
  { name: "45-54", value: 15, color: "#10b981" },
  { name: "55+", value: 7, color: "#f59e0b" },
]

export function AnalyticsPage() {
  const { dateRange, setDateRange, exportReport } = useAnalyticsStore()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    await exportReport('pdf')
    setIsExporting(false)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your social media performance</p>
        </div>
        <div className="flex items-center gap-3">
            <DateRangePicker
            value={dateRange}
            onChange={(range) => setDateRange(range!)}
            />
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
                {isExporting ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div> : <Download className="h-4 w-4 mr-2" />}
                Export Report
            </Button>
        </div>
      </div>

      {/* Performance Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => (
            <PerformanceMetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                trend={metric.trend as "up" | "down" | "neutral"}
                data={metric.data}
                color={metric.color}
            />
        ))}
      </div>

      <PerformanceTimelineChart />
      {/* Main Analytics Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-8">
          <ContentPerformanceTable />
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

      {/* Platform Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platformData.map(platform => (
            <PlatformComparisonCard
                key={platform.name}
                name={platform.name}
                followers={platform.followers}
                reach={platform.reach}
                engagement={platform.engagement}
                performance={platform.performance}
                bgColor={platform.bgColor}
                iconColor={platform.iconColor}
                progressColor={platform.progressColor}
                icon={platform.icon}
            />
        ))}
      </div>
    </div>
  )
}
