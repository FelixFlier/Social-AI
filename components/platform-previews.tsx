"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from "lucide-react"

const platforms = [
  { id: "instagram", name: "Instagram", color: "from-purple-500 to-pink-500", limit: 2200 },
  { id: "facebook", name: "Facebook", color: "from-blue-600 to-blue-700", limit: 63206 },
  { id: "linkedin", name: "LinkedIn", color: "from-blue-600 to-blue-800", limit: 3000 },
  { id: "twitter", name: "Twitter", color: "from-gray-800 to-black", limit: 280 },
]

interface PlatformPreviewsProps {
  content: string
  hashtags: string[]
}

export function PlatformPreviews({ content = "", hashtags = [] }: PlatformPreviewsProps) {
  const [activeTab, setActiveTab] = useState("instagram")

  const getCharacterCount = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId)
    const totalContent = content + " " + hashtags.join(" ")
    return {
      count: totalContent.length,
      limit: platform?.limit || 0,
      percentage: (totalContent.length / (platform?.limit || 1)) * 100,
    }
  }

  const getCountColor = (percentage: number) => {
    if (percentage < 70) return "text-success"
    if (percentage < 90) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Platform Previews</h3>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/30">
          {platforms.map((platform) => (
            <TabsTrigger
              key={platform.id}
              value={platform.id}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {platform.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {platforms.map((platform) => {
          const charCount = getCharacterCount(platform.id)

          return (
            <TabsContent key={platform.id} value={platform.id} className="space-y-4">
              {/* Character Count */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Character Count</span>
                <Badge variant="outline" className={`${getCountColor(charCount.percentage)} border-current`}>
                  {charCount.count} / {charCount.limit}
                </Badge>
              </div>

              {/* Platform Preview */}
              <Card className="glass-card max-w-sm mx-auto">
                {platform.id === "instagram" && <InstagramPreview content={content} hashtags={hashtags} />}
                {platform.id === "facebook" && <FacebookPreview content={content} hashtags={hashtags} />}
                {platform.id === "linkedin" && <LinkedInPreview content={content} hashtags={hashtags} />}
                {platform.id === "twitter" && <TwitterPreview content={content} hashtags={hashtags} />}
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

function InstagramPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-0">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div>
          <p className="font-semibold text-sm">socialai_pro</p>
          <p className="text-xs text-muted-foreground">Sponsored</p>
        </div>
        <MoreHorizontal className="h-4 w-4 ml-auto" />
      </div>

      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 bg-white/50 rounded-lg flex items-center justify-center mx-auto mb-2">📸</div>
          <p className="text-sm">Your image will appear here</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 p-4">
        <Heart className="h-6 w-6" />
        <MessageCircle className="h-6 w-6" />
        <Share className="h-6 w-6" />
        <Bookmark className="h-6 w-6 ml-auto" />
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-sm mb-2">
          <span className="font-semibold">socialai_pro</span> {content}
        </p>
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
  )
}

function FacebookPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          SP
        </div>
        <div>
          <p className="font-semibold text-sm">SocialAI Pro</p>
          <p className="text-xs text-muted-foreground">2 hours ago • 🌍</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm">{content}</p>
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-white/50 rounded-lg flex items-center justify-center mx-auto mb-2">🖼️</div>
            <p className="text-sm">Your media will appear here</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600">
              <Heart className="h-4 w-4" /> Like
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600">
              <MessageCircle className="h-4 w-4" /> Comment
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600">
              <Share className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </CardContent>
  )
}

function LinkedInPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold">
          SP
        </div>
        <div>
          <p className="font-semibold text-sm">SocialAI Pro</p>
          <p className="text-xs text-muted-foreground">AI-Powered Social Media • 1st</p>
          <p className="text-xs text-muted-foreground">2h • 🌍</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-relaxed">{content}</p>
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-700 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded border flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-white/80 rounded-lg flex items-center justify-center mx-auto mb-2">📊</div>
            <p className="text-sm">Professional content preview</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <Heart className="h-4 w-4" /> Like
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <MessageCircle className="h-4 w-4" /> Comment
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <Share className="h-4 w-4" /> Repost
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <Share className="h-4 w-4" /> Send
          </button>
        </div>
      </div>
    </CardContent>
  )
}

function TwitterPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold flex-shrink-0">
          SP
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-sm">SocialAI Pro</p>
            <p className="text-muted-foreground text-sm">@socialai_pro</p>
            <span className="text-muted-foreground text-sm">•</span>
            <p className="text-muted-foreground text-sm">2h</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm">{content}</p>
            <div className="flex flex-wrap gap-1">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center mx-auto mb-2">🐦</div>
                <p className="text-xs">Media preview</p>
              </div>
            </div>

            <div className="flex items-center justify-between max-w-md pt-2">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 text-sm">
                <MessageCircle className="h-4 w-4" /> 12
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 text-sm">
                <Share className="h-4 w-4" /> 5
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 text-sm">
                <Heart className="h-4 w-4" /> 48
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 text-sm">
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
