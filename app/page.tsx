"use client"

import { useState } from "react"
import { PremiumKPICards } from "@/components/premium-kpi-cards"
import { PremiumAnalyticsChart } from "@/components/premium-analytics-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Eye, Heart, MessageCircle, Plus, Share2, Sparkles, TrendingUp, Bot } from "lucide-react"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handleNavigation = (page: string, mode?: string) => {
    // Simulate navigation with page change
    setCurrentPage(page)
    if (mode) {
      console.log(`Navigating to ${page} with ${mode} mode`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h1>
            <p className="text-gray-600 mt-2">
              Your social media campaigns are performing exceptionally well this week.
            </p>
          </div>
          <Button
            className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => handleNavigation("content", "campaign")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <PremiumKPICards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Analytics Chart - Spans 2 columns */}
        <div className="lg:col-span-2">
          <PremiumAnalyticsChart />
        </div>

        {/* AI Insights Panel - Right Column */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Bot className="h-5 w-5 text-primary-500" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Peak Engagement Time</h4>
                  <p className="text-sm text-gray-600">Your audience is most active at 2-4 PM on weekdays</p>
                </div>
                <Badge className="bg-secondary-50 text-secondary-600 border-secondary-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23%
                </Badge>
              </div>
              <Button
                size="sm"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                onClick={() => handleNavigation("content", "scheduling")}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Schedule Posts
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-secondary-50 border border-secondary-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Content Performance</h4>
                  <p className="text-sm text-gray-600">Video content performs 67% better than images</p>
                </div>
                <Badge className="bg-secondary-50 text-secondary-600 border-secondary-200">+67%</Badge>
              </div>
              <Button
                size="sm"
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white"
                onClick={() => handleNavigation("content", "video")}
              >
                Create Video
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700"
                onClick={() => handleNavigation("analytics")}
              >
                View All Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <BarChart3 className="h-5 w-5 text-primary-500" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-600">Your latest social media performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  platform: "Instagram",
                  post: "Summer collection launch",
                  metrics: { likes: 1240, comments: 89, shares: 45 },
                  time: "2 hours ago",
                  status: "trending",
                },
                {
                  platform: "Twitter",
                  post: "Behind the scenes video",
                  metrics: { likes: 892, comments: 34, shares: 67 },
                  time: "4 hours ago",
                  status: "active",
                },
                {
                  platform: "LinkedIn",
                  post: "Industry insights article",
                  metrics: { likes: 456, comments: 23, shares: 89 },
                  time: "6 hours ago",
                  status: "active",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleNavigation("analytics")}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold">
                      {activity.platform[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.post}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {activity.metrics.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {activity.metrics.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {activity.metrics.shares}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        activity.status === "trending"
                          ? "bg-secondary-50 text-secondary-600 border-secondary-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }
                    >
                      {activity.status === "trending" ? (
                        <>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </>
                      ) : (
                        "Active"
                      )}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Eye className="h-5 w-5 text-primary-500" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today's Views</span>
                <span className="font-semibold text-gray-900">12.4K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Followers</span>
                <span className="font-semibold text-secondary-500">+247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="font-semibold text-primary-500">8.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Click Rate</span>
                <span className="font-semibold text-secondary-500">3.1%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">AI Credits Used</span>
                  <span className="text-gray-900">850 / 2,100</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <Button
                className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white"
                onClick={() => handleNavigation("content", "ai-generator")}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
