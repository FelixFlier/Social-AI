"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Rocket, Sparkles, Gift, Megaphone } from "lucide-react"

const campaignTemplates = [
  {
    id: "product-launch",
    name: "Product Launch",
    icon: Rocket,
    description: "Comprehensive launch strategy with teaser, announcement, and follow-up content",
    posts: 12,
    duration: "2 weeks",
    color: "text-blue-600",
  },
  {
    id: "seasonal",
    name: "Seasonal Campaign",
    icon: Gift,
    description: "Holiday or seasonal themed content to boost engagement",
    posts: 8,
    duration: "1 week",
    color: "text-green-600",
  },
  {
    id: "promotional",
    name: "Promotional Push",
    icon: Megaphone,
    description: "Sales and promotional content to drive conversions",
    posts: 6,
    duration: "3 days",
    color: "text-purple-600",
  },
  {
    id: "custom",
    name: "Custom Campaign",
    icon: Sparkles,
    description: "Build your own campaign from scratch",
    posts: 0,
    duration: "Custom",
    color: "text-orange-600",
  },
]

interface NewCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateCampaign: (campaign: any) => void
}

export function NewCampaignModal({ open, onOpenChange, onCreateCampaign }: NewCampaignModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [campaignName, setCampaignName] = useState("")
  const [campaignType, setCampaignType] = useState<"product" | "seasonal" | "promotional">("product")
  const [description, setDescription] = useState("")

  const handleCreate = () => {
    const template = campaignTemplates.find((t) => t.id === selectedTemplate)
    if (!template || !campaignName) return

    const newCampaign = {
      id: Date.now().toString(),
      title: campaignName,
      type: campaignType,
      status: "draft" as const,
      posts: template.posts,
      aiScore: Math.floor(Math.random() * 20) + 80,
      progress: 0,
      platforms: ["LinkedIn", "Instagram", "Facebook"],
      thumbnail:
        template.icon === Rocket ? "🚀" : template.icon === Gift ? "🎁" : template.icon === Megaphone ? "📢" : "✨",
      targetDate: "Next week",
    }

    onCreateCampaign(newCampaign)
    onOpenChange(false)

    // Reset form
    setSelectedTemplate("")
    setCampaignName("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Choose Template</Label>
            <div className="grid grid-cols-2 gap-3">
              {campaignTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start gap-3">
                    <template.icon className={`h-6 w-6 ${template.color} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {template.posts} posts
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Details */}
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="Enter campaign name..."
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select value={campaignType} onValueChange={(value: any) => setCampaignType(value)}>
                  <SelectTrigger className="bg-muted/30 border-0 focus:ring-1 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product Launch</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!selectedTemplate || !campaignName}
              className="gradient-primary text-white"
            >
              Create Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
