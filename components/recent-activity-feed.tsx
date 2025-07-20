"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Instagram, Linkedin, Facebook, Twitter, Bot } from "lucide-react"

interface ActivityItem {
  id: string
  type: 'post_published' | 'comment_received' | 'campaign_started' | 'ai_strategy_generated'
  title: string
  description: string
  timestamp: Date
  platform?: 'instagram' | 'linkedin' | 'facebook' | 'twitter'
  metrics?: { likes: number, comments: number, shares: number }
  status: 'success' | 'pending' | 'failed'
}

const platformIcons = {
  instagram: <Instagram className="h-5 w-5 text-white" />,
  linkedin: <Linkedin className="h-5 w-5 text-white" />,
  facebook: <Facebook className="h-5 w-5 text-white" />,
  twitter: <Twitter className="h-5 w-5 text-white" />,
  ai: <Bot className="h-5 w-5 text-white" />
}

const platformColors = {
    instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
    linkedin: "bg-blue-700",
    facebook: "bg-blue-600",
    twitter: "bg-sky-500",
    ai: "bg-gray-500",
}

const ActivityItemCard = ({ activity }: { activity: ActivityItem }) => {
  const platform = activity.platform || 'ai';
  const Icon = platformIcons[platform]
  const color = platformColors[platform]

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
        {Icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
        <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{activity.timestamp.toLocaleTimeString()}</span>
          <Badge
            variant="outline"
            className={
              activity.status === "success"
                ? "text-success border-success"
                : activity.status === "pending"
                ? "text-yellow-500 border-yellow-500"
                : "text-destructive border-destructive"
            }
          >
            {activity.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}


const RecentActivityFeed = ({ initialActivities }: { initialActivities: ActivityItem[] }) => {
  const [activities, setActivities] = useState(initialActivities)
  const [visibleCount, setVisibleCount] = useState(5)
  const [platformFilter, setPlatformFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: (activities.length + 1).toString(),
        type: 'comment_received',
        title: "New comment on Instagram",
        description: "User commented: 'Great post!'",
        timestamp: new Date(),
        platform: 'instagram',
        status: 'success',
      }
      setActivities(prev => [newActivity, ...prev])
    }, 10000) // Add a new activity every 10 seconds

    return () => clearInterval(interval)
  }, [activities])

  const filteredActivities = activities
    .filter(a => platformFilter === "all" || a.platform === platformFilter)
    .filter(a => typeFilter === "all" || a.type === typeFilter)

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
        <div className="flex gap-2 pt-2">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger><SelectValue placeholder="Platform" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="post_published">Post Published</SelectItem>
                    <SelectItem value="comment_received">Comment Received</SelectItem>
                    <SelectItem value="campaign_started">Campaign Started</SelectItem>
                    <SelectItem value="ai_strategy_generated">AI Strategy</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredActivities.slice(0, visibleCount).map((activity) => (
          <ActivityItemCard key={activity.id} activity={activity} />
        ))}
        {visibleCount < filteredActivities.length && (
          <Button onClick={() => setVisibleCount(visibleCount + 5)} className="w-full">
            Load More
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentActivityFeed
