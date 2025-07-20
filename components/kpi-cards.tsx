"use client"

import { TrendingUp, Heart, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const kpiData = [
  {
    title: "Reach",
    value: "847.2K",
    change: "+23.7%",
    changeType: "positive" as const,
    icon: TrendingUp,
    gradient: "from-primary to-secondary",
    bgGradient: "from-primary/10 to-secondary/10",
  },
  {
    title: "Engagement",
    value: "12.4%",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Heart,
    gradient: "from-secondary to-accent",
    bgGradient: "from-secondary/10 to-accent/10",
  },
  {
    title: "ROI",
    value: "+156%",
    change: "This month",
    changeType: "neutral" as const,
    icon: DollarSign,
    gradient: "from-accent to-success",
    bgGradient: "from-accent/10 to-success/10",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {kpiData.map((kpi, index) => (
        <Card
          key={kpi.title}
          className="glass-card hover:scale-105 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Gradient border effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${kpi.gradient} opacity-20 rounded-xl`} />
          <div className="absolute inset-[1px] bg-white/90 backdrop-blur-md rounded-xl" />

          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${kpi.bgGradient} group-hover:scale-110 transition-transform duration-300`}
              >
                <kpi.icon className={`h-6 w-6 bg-gradient-to-r ${kpi.gradient} bg-clip-text text-transparent`} />
              </div>
              {kpi.changeType === "positive" && (
                <div className="flex items-center gap-1 text-success font-medium text-sm">
                  <TrendingUp className="h-4 w-4" />
                  {kpi.change}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
              {kpi.changeType === "neutral" && <p className="text-sm text-muted-foreground">{kpi.change}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
