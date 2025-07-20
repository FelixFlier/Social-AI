"use client"

import { useState } from "react"
import { CampaignHeader } from "@/components/campaign-header"
import { KanbanColumn } from "@/components/kanban-column"
import { NewCampaignModal } from "@/components/new-campaign-modal"
import type { Campaign } from "@/components/campaign-card"

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Product Teaser Campaign",
    type: "product",
    status: "draft",
    posts: 5,
    aiScore: 89,
    progress: 60,
    platforms: ["LinkedIn", "Instagram"],
    thumbnail: "📱",
    targetDate: "Next week",
  },
  {
    id: "2",
    title: "Summer Collection Launch",
    type: "seasonal",
    status: "draft",
    posts: 8,
    aiScore: 92,
    progress: 25,
    platforms: ["Instagram", "Facebook"],
    thumbnail: "☀️",
    targetDate: "July 15th",
  },
  {
    id: "3",
    title: "Launch Week Blitz",
    type: "product",
    status: "scheduled",
    posts: 12,
    progress: 100,
    platforms: ["LinkedIn", "Instagram", "Facebook", "Twitter"],
    thumbnail: "🎉",
    startDate: "Monday 9AM",
  },
  {
    id: "4",
    title: "Back to School Promo",
    type: "promotional",
    status: "scheduled",
    posts: 6,
    progress: 85,
    platforms: ["Instagram", "Facebook"],
    thumbnail: "🎒",
    startDate: "August 1st",
  },
  {
    id: "5",
    title: "Summer Sale Push",
    type: "promotional",
    status: "active",
    posts: 8,
    performance: 34,
    progress: 75,
    platforms: ["All"],
    thumbnail: "🔥",
    daysRemaining: 2,
    metrics: {
      engagement: "+34%",
    },
  },
  {
    id: "6",
    title: "Q2 Product Showcase",
    type: "product",
    status: "active",
    posts: 15,
    performance: 28,
    progress: 40,
    platforms: ["LinkedIn", "Twitter"],
    thumbnail: "🚀",
    daysRemaining: 5,
    metrics: {
      engagement: "+28%",
    },
  },
  {
    id: "7",
    title: "Spring Campaign 2024",
    type: "seasonal",
    status: "completed",
    posts: 20,
    performance: 156,
    progress: 100,
    platforms: ["All"],
    thumbnail: "🌸",
    metrics: {
      engagement: "+156%",
      reach: "2.4M",
      conversions: 1247,
    },
  },
  {
    id: "8",
    title: "Holiday Season Push",
    type: "promotional",
    status: "completed",
    posts: 25,
    performance: 89,
    progress: 100,
    platforms: ["Instagram", "Facebook"],
    thumbnail: "🎄",
    metrics: {
      engagement: "+89%",
      reach: "1.8M",
      conversions: 892,
    },
  },
]

const columns = [
  { status: "draft" as const, title: "Draft", icon: "📋", color: "text-gray-600" },
  { status: "scheduled" as const, title: "Scheduled", icon: "⏰", color: "text-blue-600" },
  { status: "active" as const, title: "Active", icon: "🔄", color: "text-green-600" },
  { status: "completed" as const, title: "Completed", icon: "✅", color: "text-purple-600" },
]

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter = activeFilter === "all" || campaign.type === activeFilter
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getCampaignsByStatus = (status: Campaign["status"]) => {
    return filteredCampaigns.filter((campaign) => campaign.status === status)
  }

  const handleDrop = (campaignId: string, newStatus: Campaign["status"]) => {
    setCampaigns((prev) =>
      prev.map((campaign) => (campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign)),
    )
  }

  const handleEdit = (campaign: Campaign) => {
    console.log("Edit campaign:", campaign.title)
  }

  const handlePreview = (campaign: Campaign) => {
    console.log("Preview campaign:", campaign.title)
  }

  const handlePublish = (campaign: Campaign) => {
    console.log("Publish campaign:", campaign.title)
  }

  const handlePause = (campaign: Campaign) => {
    console.log("Pause campaign:", campaign.title)
  }

  const handleAnalytics = (campaign: Campaign) => {
    console.log("View analytics for:", campaign.title)
  }

  const handleCreateCampaign = (newCampaign: Campaign) => {
    setCampaigns((prev) => [...prev, newCampaign])
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <CampaignHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewCampaign={() => setShowNewCampaignModal(true)}
      />

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            icon={column.icon}
            campaigns={getCampaignsByStatus(column.status)}
            color={column.color}
            status={column.status}
            onEdit={handleEdit}
            onPreview={handlePreview}
            onPublish={handlePublish}
            onPause={handlePause}
            onAnalytics={handleAnalytics}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <NewCampaignModal
        open={showNewCampaignModal}
        onOpenChange={setShowNewCampaignModal}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  )
}
