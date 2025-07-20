"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"

const filterTabs = [
  { value: "all", label: "All" },
  { value: "product", label: "Product Launches" },
  { value: "seasonal", label: "Seasonal" },
  { value: "promotional", label: "Promotional" },
]

interface CampaignHeaderProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onNewCampaign: () => void
}

export function CampaignHeader({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onNewCampaign,
}: CampaignHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">🚀 Campaign Management</h1>
        <Button
          onClick={onNewCampaign}
          className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Tabs value={activeFilter} onValueChange={onFilterChange}>
          <TabsList className="bg-muted/30">
            {filterTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
