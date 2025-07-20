"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"

const brandVoices = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "expert", label: "Expert" },
  { value: "friendly", label: "Friendly" },
]

const contentStyles = [
  { id: "educational", label: "Educational" },
  { id: "promotional", label: "Promotional" },
  { id: "behind-scenes", label: "Behind-the-scenes" },
]

const hashtagStrategies = [
  { value: "growth", label: "Growth-focused" },
  { value: "niche", label: "Niche-specific" },
  { value: "trending", label: "Trending" },
]

export function AIConfiguration() {
  const [brandVoice, setBrandVoice] = useState("professional")
  const [selectedStyles, setSelectedStyles] = useState(["educational"])
  const [hashtagStrategy, setHashtagStrategy] = useState("growth")
  const [postingFrequency, setPostingFrequency] = useState([14])

  const handleStyleChange = (styleId: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles([...selectedStyles, styleId])
    } else {
      setSelectedStyles(selectedStyles.filter((id) => id !== styleId))
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />🤖 AI Assistant Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand Voice */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Brand Voice</Label>
          <Select value={brandVoice} onValueChange={setBrandVoice}>
            <SelectTrigger className="bg-muted/30 border-0 focus:ring-1 focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {brandVoices.map((voice) => (
                <SelectItem key={voice.value} value={voice.value}>
                  {voice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content Style */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Content Style</Label>
          <div className="space-y-2">
            {contentStyles.map((style) => (
              <div key={style.id} className="flex items-center space-x-2">
                <Checkbox
                  id={style.id}
                  checked={selectedStyles.includes(style.id)}
                  onCheckedChange={(checked) => handleStyleChange(style.id, checked as boolean)}
                />
                <Label htmlFor={style.id} className="text-sm">
                  {style.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Hashtag Strategy */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Hashtag Strategy</Label>
          <Select value={hashtagStrategy} onValueChange={setHashtagStrategy}>
            <SelectTrigger className="bg-muted/30 border-0 focus:ring-1 focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hashtagStrategies.map((strategy) => (
                <SelectItem key={strategy.value} value={strategy.value}>
                  {strategy.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Posting Frequency */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Weekly Posting Target</Label>
            <span className="text-sm font-semibold text-primary">{postingFrequency[0]} posts</span>
          </div>
          <Slider
            value={postingFrequency}
            onValueChange={setPostingFrequency}
            max={35}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 post</span>
            <span>35 posts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
