"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, Eye, MessageCircle } from "lucide-react"

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

const recommendations = [
  {
    platform: "LinkedIn",
    suggestion: "Increase video content by 40% for better engagement",
    impact: "+15% engagement",
  },
  {
    platform: "Instagram",
    suggestion: "Post Stories daily to boost reach",
    impact: "+25% reach",
  },
  {
    platform: "Facebook",
    suggestion: "Use more interactive polls and questions",
    impact: "+30% comments",
  },
  {
    platform: "Twitter",
    suggestion: "Tweet during peak hours (2-4 PM)",
    impact: "+20% impressions",
  },
]

export function PlatformPerformance() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-secondary" />
          Platform Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformData}>
              <XAxis dataKey="platform" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="engagement" fill="#6366f1" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Details */}
        <div className="space-y-3">
          {platformData.map((platform) => (
            <div
              key={platform.platform}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-lg">{platform.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{platform.platform}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                <Badge className="bg-success/10 text-success">
                  <TrendingUp className="h-3 w-3 mr-1" />+{platform.growth}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="font-medium text-sm mb-3">Platform Recommendations</h4>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">{rec.platform}</p>
                    <p className="text-xs text-muted-foreground">{rec.suggestion}</p>
                  </div>
                  <Badge variant="outline" className="text-success border-success text-xs">
                    {rec.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
