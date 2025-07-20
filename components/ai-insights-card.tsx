"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Pin, Clock, TrendingUp, Video } from "lucide-react"

const insights = [
  {
    id: 1,
    icon: Clock,
    text: "Your Tuesday posts get 34% more engagement",
    type: "timing",
    confidence: 92,
  },
  {
    id: 2,
    icon: Video,
    text: "Video content performs 67% better than images",
    type: "content",
    confidence: 88,
  },
  {
    id: 3,
    icon: TrendingUp,
    text: "Try posting between 2-4 PM for optimal reach",
    type: "optimization",
    confidence: 95,
  },
]

export function AIInsightsCard() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />🤖 AI-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="relative p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
          >
            {/* Speech bubble tail */}
            <div className="absolute -left-2 top-4 w-4 h-4 bg-gradient-to-r from-blue-50 to-purple-50 border-l border-b border-blue-100 transform rotate-45"></div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/80">
                <insight.icon className="h-4 w-4 text-primary" />
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-sm font-medium text-foreground">{insight.text}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Confidence:</div>
                    <div className="text-xs font-semibold text-success">{insight.confidence}%</div>
                  </div>

                  <Button size="sm" className="gradient-primary text-white text-xs h-7">
                    <Pin className="h-3 w-3 mr-1" />📌 Apply Suggestion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <Button variant="outline" className="w-full bg-transparent hover:bg-muted/50">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
