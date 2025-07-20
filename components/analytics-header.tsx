"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, FileText, Users, Trophy } from "lucide-react"

const quickMetrics = [
  {
    title: "Total Posts",
    value: "247",
    change: "+12",
    changeType: "positive" as const,
    icon: FileText,
    color: "text-primary",
  },
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+23.7%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "text-secondary",
  },
  {
    title: "Engagement Rate",
    value: "12.4%",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Users,
    color: "text-accent",
  },
  {
    title: "Top Platform",
    value: "LinkedIn",
    change: "67% of reach",
    changeType: "neutral" as const,
    icon: Trophy,
    color: "text-success",
  },
]

export function AnalyticsHeader() {
  const [dateRange, setDateRange] = useState("30")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">📊 Analytics & Insights</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {quickMetrics.map((metric, index) => (
          <Card key={metric.title} className="glass-card hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-muted/30`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                {metric.changeType === "positive" && (
                  <div className="flex items-center gap-1 text-success font-medium text-sm">
                    <TrendingUp className="h-4 w-4" />
                    {metric.change}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                {metric.changeType === "neutral" && <p className="text-sm text-muted-foreground">{metric.change}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
