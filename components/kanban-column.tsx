"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CampaignCard, type Campaign } from "./campaign-card"

interface KanbanColumnProps {
  title: string
  icon: string
  campaigns: Campaign[]
  color: string
  onEdit: (campaign: Campaign) => void
  onPreview: (campaign: Campaign) => void
  onPublish: (campaign: Campaign) => void
  onPause: (campaign: Campaign) => void
  onAnalytics: (campaign: Campaign) => void
  onDrop: (campaignId: string, newStatus: Campaign["status"]) => void
  status: Campaign["status"]
}

export function KanbanColumn({
  title,
  icon,
  campaigns,
  color,
  onEdit,
  onPreview,
  onPublish,
  onPause,
  onAnalytics,
  onDrop,
  status,
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const campaignId = e.dataTransfer.getData("text/plain")
    onDrop(campaignId, status)
  }

  const handleDragStart = (e: React.DragEvent, campaignId: string) => {
    e.dataTransfer.setData("text/plain", campaignId)
  }

  return (
    <div className="flex-1 min-w-80">
      <Card className="glass-card h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span className="text-base font-semibold">{title}</span>
            </div>
            <Badge variant="outline" className={`${color} border-current`}>
              {campaigns.length}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4 min-h-96" onDragOver={handleDragOver} onDrop={handleDrop}>
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                draggable
                onDragStart={(e) => handleDragStart(e, campaign.id)}
                className="transition-opacity duration-200 hover:opacity-90"
              >
                <CampaignCard
                  campaign={campaign}
                  onEdit={onEdit}
                  onPreview={onPreview}
                  onPublish={onPublish}
                  onPause={onPause}
                  onAnalytics={onAnalytics}
                />
              </div>
            ))}

            {campaigns.length === 0 && (
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <p className="text-muted-foreground text-sm">Drop campaigns here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
