"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar, ChevronDown, Rocket, Target, TrendingUp, BarChart3, CheckCircle } from "lucide-react"

const strategyPhases = [
  {
    week: 1,
    title: "Foundation & Awareness",
    theme: "Teaser content & thought leadership",
    platforms: { linkedin: 70, twitter: 20, facebook: 10 },
    progress: 100,
    status: "completed",
    posts: 7,
  },
  {
    week: 2,
    title: "Feature Showcase",
    theme: "Product highlights & demos",
    platforms: { linkedin: 65, twitter: 25, facebook: 10 },
    progress: 85,
    status: "in-progress",
    posts: 7,
  },
  {
    week: 3,
    title: "Social Proof",
    theme: "Customer testimonials & case studies",
    platforms: { linkedin: 60, twitter: 30, facebook: 10 },
    progress: 0,
    status: "upcoming",
    posts: 7,
  },
  {
    week: 4,
    title: "Launch & Convert",
    theme: "Announcement & special offers",
    platforms: { linkedin: 50, twitter: 35, facebook: 15 },
    progress: 0,
    status: "upcoming",
    posts: 7,
  },
]

const contentIdeas = [
  "LinkedIn: 'The Future of SaaS: 5 Trends Shaping 2024'",
  "Twitter: 'Behind the scenes: Building our new feature'",
  "LinkedIn: 'Case Study: How Company X increased ROI by 300%'",
  "Twitter: 'Quick tip: Automate your social media in 5 minutes'",
  "Facebook: 'Customer spotlight: Success story video'",
  "LinkedIn: 'Industry report: Social Media Marketing Statistics'",
]

const previousStrategies = [
  {
    id: 1,
    name: "Q1 Product Launch",
    period: "Jan - Mar 2024",
    metrics: { reach: "2.4M", engagement: "+156%", conversions: "1,247" },
    status: "completed",
  },
  {
    id: 2,
    name: "Brand Awareness Campaign",
    period: "Oct - Dec 2023",
    metrics: { reach: "1.8M", engagement: "+89%", conversions: "892" },
    status: "completed",
  },
  {
    id: 3,
    name: "Holiday Season Push",
    period: "Nov - Dec 2023",
    metrics: { reach: "3.1M", engagement: "+234%", conversions: "2,156" },
    status: "completed",
  },
]

export function StrategyVisualization() {
  const [expandedStrategies, setExpandedStrategies] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success"
      case "in-progress":
        return "text-warning"
      case "upcoming":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "in-progress":
        return <div className="h-4 w-4 rounded-full bg-warning animate-pulse" />
      case "upcoming":
        return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Strategy Map */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />📊 Your Strategy Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">46% Complete</span>
            </div>
            <Progress value={46} className="h-2" />
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {strategyPhases.map((phase) => (
              <div key={phase.week} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(phase.status)}
                    {phase.week < 4 && <div className="w-px h-12 bg-border mt-2" />}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">
                          Week {phase.week}: {phase.title}
                        </h4>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(phase.status)} border-current`}>
                          {phase.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{phase.theme}</p>
                    </div>

                    {/* Platform Distribution */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded bg-blue-600"></div>
                        <span>LinkedIn {phase.platforms.linkedin}%</span>
                        <div className="w-3 h-3 rounded bg-black"></div>
                        <span>Twitter {phase.platforms.twitter}%</span>
                        <div className="w-3 h-3 rounded bg-blue-500"></div>
                        <span>Facebook {phase.platforms.facebook}%</span>
                      </div>
                      <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                        <div className="bg-blue-600" style={{ width: `${phase.platforms.linkedin}%` }} />
                        <div className="bg-black" style={{ width: `${phase.platforms.twitter}%` }} />
                        <div className="bg-blue-500" style={{ width: `${phase.platforms.facebook}%` }} />
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{phase.posts} posts planned</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full gradient-primary text-white">
            <Calendar className="h-4 w-4 mr-2" />📅 Add to Calendar
          </Button>
        </CardContent>
      </Card>

      {/* Content Ideas */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-secondary" />
            Generated Content Ideas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {contentIdeas.map((idea, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
                {idea}
              </div>
            ))}
          </div>

          <Button className="w-full gradient-primary text-white">
            <Rocket className="h-4 w-4 mr-2" />🚀 Create These Posts
          </Button>
        </CardContent>
      </Card>

      {/* Previous Strategies */}
      <Card className="glass-card">
        <Collapsible open={expandedStrategies} onOpenChange={setExpandedStrategies}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />📁 Previous Strategies
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedStrategies ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="space-y-4">
              {previousStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-sm">{strategy.name}</h4>
                      <p className="text-xs text-muted-foreground">{strategy.period}</p>
                    </div>
                    <Badge className="bg-success/10 text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Reach</p>
                      <p className="font-semibold">{strategy.metrics.reach}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-semibold text-success">{strategy.metrics.engagement}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-semibold">{strategy.metrics.conversions}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Reuse Strategy
                  </Button>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  )
}
