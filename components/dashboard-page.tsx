"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, Zap, Plus, BarChart3, Bot, Video, Sparkles } from "lucide-react"

const stats = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Across all platforms",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Engagement Rate",
    value: "8.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Users,
    description: "Average engagement",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Scheduled Posts",
    value: "47",
    change: "This week",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "Ready to publish",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "AI Credits",
    value: "1,250",
    change: "850 used",
    changeType: "neutral" as const,
    icon: Zap,
    description: "Content generation",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
]

const quickActions = [
  {
    title: "Create Campaign",
    description: "Launch a new marketing campaign",
    icon: Plus,
    color: "bg-gradient-to-r from-primary to-secondary",
    action: "content",
  },
  {
    title: "Schedule Posts",
    description: "Plan your content calendar",
    icon: Calendar,
    color: "bg-gradient-to-r from-secondary to-accent",
    action: "content",
  },
  {
    title: "View Analytics",
    description: "Check performance metrics",
    icon: BarChart3,
    color: "bg-gradient-to-r from-accent to-success",
    action: "analytics",
  },
  {
    title: "AI Strategy",
    description: "Get AI-powered insights",
    icon: Bot,
    color: "bg-gradient-to-r from-success to-primary",
    action: "ai-strategy",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "post",
    title: "Instagram post published",
    description: "Behind the scenes video",
    time: "2 hours ago",
    metrics: { likes: "1.2K", comments: "89", shares: "45" },
    platform: "Instagram",
    status: "published",
  },
  {
    id: 2,
    type: "campaign",
    title: "LinkedIn campaign started",
    description: "Product launch announcement",
    time: "4 hours ago",
    metrics: { reach: "15.6K", engagement: "8.9%", clicks: "234" },
    platform: "LinkedIn",
    status: "active",
  },
  {
    id: 3,
    type: "ai",
    title: "AI content generated",
    description: "5 posts for next week",
    time: "6 hours ago",
    metrics: { posts: "5", platforms: "3", scheduled: "12" },
    platform: "AI",
    status: "ready",
  },
]

interface DashboardPageProps {
  onPageChange: (page: string) => void
}

export function DashboardPage({ onPageChange }: DashboardPageProps) {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Welcome back, John! 👋</h1>
        <p className="text-xl text-gray-600">Here's what's happening with your social media today</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="glass-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">{stat.title}</CardTitle>
              <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="flex items-center gap-2">
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
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Card
              key={action.title}
              className="glass-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              onClick={() => onPageChange(action.action)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Performance Overview */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-gray-700">Interactive Chart</p>
                  <p className="text-gray-500">Performance data visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* AI Insights */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/80">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Peak Engagement Time</h4>
                    <p className="text-xs text-gray-600">Post at 2-4 PM for +23% engagement</p>
                  </div>
                </div>
                <Button size="sm" className="w-full gradient-primary text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Posts
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/80">
                    <Video className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Content Opportunity</h4>
                    <p className="text-xs text-gray-600">Video content gets 67% more engagement</p>
                  </div>
                </div>
                <Button size="sm" className="w-full gradient-primary text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Create Video
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {activity.platform === "Instagram" ? "IG" : activity.platform === "LinkedIn" ? "LI" : "AI"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{activity.time}</span>
                      <Badge
                        variant="outline"
                        className={
                          activity.status === "published"
                            ? "text-success border-success"
                            : activity.status === "active"
                              ? "text-primary border-primary"
                              : "text-warning border-warning"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
