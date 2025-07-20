"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, Zap, Plus, BarChart3, Bot, Video, Sparkles } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useDashboardStore } from "@/lib/store"
import UpcomingPostsPreview from "./upcoming-posts-preview"
import RecentActivityFeed from "./recent-activity-feed"
import QuickActionCard from "./quick-action-card"
import PerformanceCard from "./performance-card"

// Mock data fetching functions
const fetchMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const generateChartData = () => Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i + 1}`, value: Math.floor(Math.random() * 1000) + 200 }))
  return [
    {
      title: "Total Reach",
      value: "2.4M",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Across all platforms",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      gradient: "from-blue-500 to-purple-500",
      data: generateChartData(),
    },
    {
      title: "Engagement Rate",
      value: "8.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Users,
      description: "Average engagement",
      color: "text-green-500",
      bgColor: "bg-green-100",
      gradient: "from-green-500 to-teal-500",
      data: generateChartData(),
    },
    {
      title: "Scheduled Posts",
      value: "47",
      change: "This week",
      changeType: "neutral" as const,
      icon: Calendar,
      description: "Ready to publish",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      gradient: "from-orange-500 to-red-500",
      data: generateChartData(),
    },
    {
      title: "AI Credits",
      value: "1,250",
      change: "850 used",
      changeType: "neutral" as const,
      icon: Zap,
      description: "Content generation",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
      gradient: "from-indigo-500 to-violet-500",
      data: generateChartData(),
    },
  ]
}

const fetchActivities = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    {
      id: '1',
      type: 'post_published',
      title: "Instagram post published",
      description: "Behind the scenes video",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platform: 'instagram',
      metrics: { likes: 1200, comments: 89, shares: 45 },
      status: 'success',
    },
    {
      id: '2',
      type: 'campaign_started',
      title: "LinkedIn campaign started",
      description: "Product launch announcement",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      platform: 'linkedin',
      metrics: { likes: 15600, comments: 234, shares: 89 },
      status: 'success',
    },
    {
      id: '3',
      type: 'ai_strategy_generated',
      title: "AI content generated",
      description: "5 posts for next week",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'success',
    },
  ]
}

const fetchUpcomingPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
        { id: '1', platform: 'instagram', content: 'New product launch!', scheduledTime: new Date(Date.now() + 1 * 60 * 60 * 1000) },
        { id: '2', platform: 'twitter', content: 'Join our webinar tomorrow.', scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000) },
        { id: '3', platform: 'linkedin', content: 'Check out our new blog post.', scheduledTime: new Date(Date.now() + 3 * 60 * 60 * 1000) },
        { id: '4', platform: 'facebook', content: 'Our weekly Q&A is live!', scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000) },
        { id: '5', platform: 'instagram', content: 'Behind the scenes.', scheduledTime: new Date(Date.now() + 5 * 60 * 60 * 1000) },
        { id: '6', platform: 'twitter', content: 'A tip for our followers.', scheduledTime: new Date(Date.now() + 6 * 60 * 60 * 1000) },
    ]
}


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

interface DashboardPageProps {
  onPageChange: (page: string) => void
}

export function DashboardPage({ onPageChange }: DashboardPageProps) {
  const { metrics, activities, upcomingPosts, updateMetrics, setActivities, setUpcomingPosts } = useDashboardStore()
  const userPlan = "Pro" // "Free", "Pro", "Agency"

  const { isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => Promise.all([fetchMetrics(), fetchActivities(), fetchUpcomingPosts()]),
    onSuccess: ([metricsData, activitiesData, postsData]) => {
      updateMetrics(metricsData)
      setActivities(activitiesData)
      setUpcomingPosts(postsData)
    },
  })

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Welcome back, John! 👋</h1>
        <p className="text-xl text-gray-600">Here's what's happening with your social media today</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {(isLoading || !metrics) ?
          Array.from({ length: 4 }).map((_, index) => <Card key={index}><CardHeader><div className="h-8 bg-gray-200 rounded w-3/4" /></CardHeader><CardContent><div className="h-12 bg-gray-200 rounded w-1/2" /><div className="h-6 bg-gray-200 rounded w-full mt-2" /></CardContent></Card>) :
          metrics.map((stat: any) => (
            <PerformanceCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              description={stat.description}
              color={stat.color}
              bgColor={stat.bgColor}
              gradient={stat.gradient}
              data={stat.data}
            />
          ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              icon={action.icon}
              color={action.color}
              action={async () => {
                // simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                if (action.action === 'ai-strategy' && userPlan !== 'Agency') {
                  return false
                }
                onPageChange(action.action)
                return true
              }}
              userPlan={userPlan}
              requiredPlan={action.action === 'ai-strategy' ? 'Agency' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="glass-card">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Performance Overview
              </Title>
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
          <UpcomingPostsPreview initialPosts={upcomingPosts} />
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-2 space-y-8">
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
          <RecentActivityFeed initialActivities={activities} />
        </div>
      </div>
    </div>
  )
}
