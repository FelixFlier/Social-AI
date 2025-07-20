"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const chartData = [
  { date: "Jan 1", reach: 45000, engagement: 8.2, clicks: 1200 },
  { date: "Jan 5", reach: 52000, engagement: 9.1, clicks: 1450 },
  { date: "Jan 10", reach: 48000, engagement: 7.8, clicks: 1320 },
  { date: "Jan 15", reach: 61000, engagement: 10.5, clicks: 1680 },
  { date: "Jan 20", reach: 58000, engagement: 9.8, clicks: 1590 },
  { date: "Jan 25", reach: 67000, engagement: 11.2, clicks: 1820 },
  { date: "Jan 30", reach: 72000, engagement: 12.4, clicks: 1950 },
]

const platforms = [
  { name: "Facebook", color: "#1877f2", active: true },
  { name: "Instagram", color: "#E4405F", active: true },
  { name: "LinkedIn", color: "#0077b5", active: false },
  { name: "Twitter", color: "#000000", active: true },
]

export function PremiumAnalyticsChart() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms.filter((p) => p.active).map((p) => p.name))
  const [timeRange, setTimeRange] = useState("30")

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformName) ? prev.filter((p) => p !== platformName) : [...prev, platformName],
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-700">Performance Overview</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-gray-50 border-gray-200 focus:border-primary-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="ghost"
              size="sm"
              onClick={() => togglePlatform(platform.name)}
              className={`transition-all duration-200 ${
                selectedPlatforms.includes(platform.name)
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600"
              }`}
            >
              {platform.name}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px 0 rgba(139, 92, 246, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="reach"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#reachGradient)"
                name="Reach"
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#engagementGradient)"
                name="Engagement %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
            <span className="text-sm text-gray-600">Reach</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary-500"></div>
            <span className="text-sm text-gray-600">Engagement</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
