"use client"

import { TrendingUp, Heart, DollarSign, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const kpiData = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+23.7%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "text-secondary-500",
  },
  {
    title: "Engagement Rate",
    value: "12.4%",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Heart,
    color: "text-primary-500",
  },
  {
    title: "Revenue Impact",
    value: "$45.2K",
    change: "+156%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "text-secondary-500",
  },
  {
    title: "New Followers",
    value: "3,247",
    change: "+34%",
    changeType: "positive" as const,
    icon: Users,
    color: "text-primary-500",
  },
]

export function PremiumKPICards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card key={kpi.title} className="glass-card hover:scale-105 transition-all duration-200 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              {kpi.changeType === "positive" && (
                <div className="flex items-center gap-1 text-secondary-500 font-medium text-sm">
                  <TrendingUp className="h-4 w-4" />
                  {kpi.change}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
