"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts"

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

const metrics = [
  { key: "reach", name: "Reach", color: "#6366f1", gradient: "reachGradient" },
  { key: "engagement", name: "Engagement", color: "#8b5cf6", gradient: "engagementGradient" },
  { key: "clicks", name: "Clicks", color: "#06b6d4", gradient: "clicksGradient" },
  { key: "conversions", name: "Conversions", color: "#10b981", gradient: "conversionsGradient" },
]

export function MainAnalyticsChart() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms.filter((p) => p.active).map((p) => p.name))
  const [selectedMetrics, setSelectedMetrics] = useState(["reach", "engagement"])

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformName) ? prev.filter((p) => p !== platformName) : [...prev, platformName],
    )
  }

  const toggleMetric = (metricKey: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricKey) ? prev.filter((m) => m !== metricKey) : [...prev, metricKey],
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Performance Trends</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              Zoom
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Export
            </Button>
          </div>
        </div>

        {/* Platform Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant={selectedPlatforms.includes(platform.name) ? "default" : "outline"}
              size="sm"
              onClick={() => togglePlatform(platform.name)}
              className={`transition-all duration-200 ${
                selectedPlatforms.includes(platform.name)
                  ? platform.name === "Instagram"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : ""
                  : "bg-transparent"
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

        {/* Metric Filters */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetrics.includes(metric.key) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleMetric(metric.key)}
              className="transition-all duration-200 bg-transparent"
              style={{
                backgroundColor: selectedMetrics.includes(metric.key) ? metric.color : undefined,
                color: selectedMetrics.includes(metric.key) ? "white" : undefined,
              }}
            >
              {metric.name}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
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
                <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
              {selectedMetrics.map((metricKey) => {
                const metric = metrics.find((m) => m.key === metricKey)
                if (!metric) return null
                return (
                  <Area
                    key={metricKey}
                    type="monotone"
                    dataKey={metricKey}
                    stroke={metric.color}
                    strokeWidth={3}
                    fill={`url(#${metric.gradient})`}
                    name={metric.name}
                  />
                )
              })}
              <ReferenceLine y={10} stroke="#10b981" strokeDasharray="5 5" label="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          {metrics.map((metric) => (
            <div key={metric.key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }}></div>
              <span className="text-sm text-muted-foreground">{metric.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
