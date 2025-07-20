"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Eye, Pause, BarChart3, MoreHorizontal, Calendar, Target, TrendingUp, Clock } from "lucide-react"

export interface Campaign {
  id: string
  title: string
  type: "product" | "seasonal" | "promotional"
  status: "draft" | "scheduled" | "active" | "completed"
  posts: number
  aiScore?: number
  performance?: number
  targetDate?: string
  startDate?: string
  daysRemaining?: number
  progress: number
  platforms: string[]
  thumbnail: string
  metrics?: {
    engagement?: string
    reach?: string
    conversions?: number
  }
}

interface CampaignCardProps {
  campaign: Campaign
  onEdit: (campaign: Campaign) => void
  onPreview: (campaign: Campaign) => void
  onPublish: (campaign: Campaign) => void
  onPause: (campaign: Campaign) => void
  onAnalytics: (campaign: Campaign) => void
}

const typeColors = {
  product: "bg-blue-100 text-blue-700 border-blue-200",
  seasonal: "bg-green-100 text-green-700 border-green-200",
  promotional: "bg-purple-100 text-purple-700 border-purple-200",
}

const statusIcons = {
  draft: "📋",
  scheduled: "⏰",
  active: "🔄",
  completed: "✅",
}

export function CampaignCard({ campaign, onEdit, onPreview, onPublish, onPause, onAnalytics }: CampaignCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getActionButtons = () => {
    switch (campaign.status) {
      case "draft":
        return (
          <>
            <Button size="sm" variant="outline" onClick={() => onEdit(campaign)} className="bg-transparent">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline" onClick={() => onPreview(campaign)} className="bg-transparent">
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
          </>
        )
      case "scheduled":
        return (
          <>
            <Button size="sm" variant="outline" onClick={() => onPause(campaign)} className="bg-transparent">
              <Pause className="h-3 w-3 mr-1" />
              Pause
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAnalytics(campaign)} className="bg-transparent">
              <BarChart3 className="h-3 w-3 mr-1" />
              Preview Analytics
            </Button>
          </>
        )
      case "active":
        return (
          <>
            <Button size="sm" className="gradient-primary text-white" onClick={() => onAnalytics(campaign)}>
              <BarChart3 className="h-3 w-3 mr-1" />
              Live Analytics
            </Button>
            <Button size="sm" variant="outline" onClick={() => onPause(campaign)} className="bg-transparent">
              <Pause className="h-3 w-3 mr-1" />
              Pause
            </Button>
          </>
        )
      case "completed":
        return (
          <>
            <Button size="sm" variant="outline" onClick={() => onAnalytics(campaign)} className="bg-transparent">
              <BarChart3 className="h-3 w-3 mr-1" />
              View Report
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(campaign)} className="bg-transparent">
              <Edit className="h-3 w-3 mr-1" />
              Duplicate
            </Button>
          </>
        )
    }
  }

  return (
    <Card
      className={`glass-card cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isHovered ? "scale-105 shadow-glass-hover" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{statusIcons[campaign.status]}</span>
              <Badge className={typeColors[campaign.type]}>{campaign.type}</Badge>
            </div>
            <h3 className="font-semibold text-foreground text-sm leading-tight">{campaign.title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(campaign)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPreview(campaign)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAnalytics(campaign)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center mx-auto mb-2">
              {campaign.thumbnail}
            </div>
            <p className="text-xs">Campaign Preview</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Posts</span>
            <span className="font-medium">{campaign.posts}</span>
          </div>

          {campaign.aiScore && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">🤖 AI Score</span>
              <span className="font-medium text-success">{campaign.aiScore}%</span>
            </div>
          )}

          {campaign.performance && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Performance</span>
              <span className="font-medium text-primary">+{campaign.performance}%</span>
            </div>
          )}

          {campaign.targetDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Target: {campaign.targetDate}</span>
            </div>
          )}

          {campaign.startDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Starts: {campaign.startDate}</span>
            </div>
          )}

          {campaign.daysRemaining && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{campaign.daysRemaining} days remaining</span>
            </div>
          )}

          {campaign.metrics?.engagement && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success font-medium">{campaign.metrics.engagement} engagement</span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-2" />
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1">
          {campaign.platforms.map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">{getActionButtons()}</div>
      </CardContent>
    </Card>
  )
}
