"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts"
import { TrendingUp, Users, Target, Award } from "lucide-react"

const competitorData = [
  { metric: "Engagement Rate", you: 12.4, average: 9.8, leader: 15.2 },
  { metric: "Posting Frequency", you: 8.5, average: 12.2, leader: 18.0 },
  { metric: "Follower Growth", you: 23.7, average: 15.4, leader: 28.9 },
  { metric: "Content Quality", you: 87, average: 72, leader: 92 },
]

const contentTypeData = [
  { type: "Video", you: 45, competitor: 38, industry: 42 },
  { type: "Images", you: 35, competitor: 42, industry: 38 },
  { type: "Text", you: 15, competitor: 12, industry: 15 },
  { type: "Carousel", you: 5, competitor: 8, industry: 5 },
]

const trendData = [
  { month: "Jan", you: 8.2, competitor: 7.8, industry: 7.5 },
  { month: "Feb", you: 9.1, competitor: 8.2, industry: 7.8 },
  { month: "Mar", you: 10.5, competitor: 8.9, industry: 8.2 },
  { month: "Apr", you: 11.2, competitor: 9.4, industry: 8.6 },
  { month: "May", you: 12.4, competitor: 9.8, industry: 9.1 },
]

export function CompetitorAnalysis() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          Competitor Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Comparison */}
        <div>
          <h4 className="font-medium text-sm mb-4 flex items-center gap-2">
            <Award className="h-4 w-4" />
            You vs Competition
          </h4>
          <div className="space-y-4">
            {competitorData.map((item) => (
              <div key={item.metric} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.metric}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">You: {item.you}%</span>
                    <span className="text-muted-foreground">Avg: {item.average}%</span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={(item.you / item.leader) * 100} className="h-2" />
                  <div
                    className="absolute top-0 w-1 h-2 bg-muted-foreground rounded"
                    style={{ left: `${(item.average / item.leader) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>Industry Leader: {item.leader}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Trend */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Engagement Trend
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="you" stroke="#6366f1" strokeWidth={2} name="You" />
                <Line type="monotone" dataKey="competitor" stroke="#8b5cf6" strokeWidth={2} name="Top Competitor" />
                <Line type="monotone" dataKey="industry" stroke="#06b6d4" strokeWidth={2} name="Industry Avg" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>You</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span>Top Competitor</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Industry Avg</span>
            </div>
          </div>
        </div>

        {/* Content Type Performance */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Content Type Performance
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentTypeData}>
                <XAxis dataKey="type" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="you" fill="#6366f1" radius={2} name="You" />
                <Bar dataKey="competitor" fill="#8b5cf6" radius={2} name="Competitor" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="font-medium text-sm mb-3">Key Insights</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm">
                <strong>+23% above average</strong> engagement rate
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Opportunity: Increase posting frequency by 30%</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Strength: Video content outperforms competitors by 18%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
