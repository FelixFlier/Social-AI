"use client"

import { Flame, Sparkles, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const trendingOpportunities = [
  {
    title: "TikTok Dance Challenge",
    percentage: "+340%",
    trend: "up" as const,
    description: "Viral dance trends are gaining massive traction",
  },
  {
    title: "Sustainability Content",
    percentage: "+156%",
    trend: "up" as const,
    description: "Eco-friendly content resonates with audiences",
  },
  {
    title: "Behind-the-scenes",
    percentage: "+89%",
    trend: "up" as const,
    description: "Authentic content drives higher engagement",
  },
]

export function AIInsightsPanel() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />🔥 Trending Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingOpportunities.map((opportunity, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{opportunity.title}</h4>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              </div>
              <Badge className="bg-success/10 text-success hover:bg-success/20 ml-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                {opportunity.percentage}
              </Badge>
            </div>

            <Button
              size="sm"
              className="w-full gradient-primary text-white group-hover:scale-105 transition-transform duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <Button variant="outline" className="w-full bg-transparent hover:bg-muted/50">
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
