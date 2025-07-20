"use client"

import { TrendingUp, Users, Calendar, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Across all platforms",
    color: "text-primary",
  },
  {
    title: "Engagement Rate",
    value: "8.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Users,
    description: "Average engagement",
    color: "text-secondary",
  },
  {
    title: "Scheduled Posts",
    value: "47",
    change: "This week",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "Ready to publish",
    color: "text-accent",
  },
  {
    title: "AI Credits",
    value: "1,250",
    change: "850 used",
    changeType: "neutral" as const,
    icon: Zap,
    description: "Content generation",
    color: "text-warning",
  },
]

export function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-card hover:shadow-glass-hover transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={stat.changeType === "positive" ? "default" : "secondary"}
                className={
                  stat.changeType === "positive"
                    ? "bg-success/10 text-success hover:bg-success/20"
                    : "bg-muted text-muted-foreground"
                }
              >
                {stat.change}
              </Badge>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
