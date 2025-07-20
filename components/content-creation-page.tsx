"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  Send,
  Bot,
  Upload,
  Hash,
  Calendar,
  Clock,
  Bold,
  Italic,
  Link,
  ImageIcon,
  Smile,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Bookmark,
} from "lucide-react"

const suggestedHashtags = [
  "#socialmedia",
  "#marketing",
  "#digitalmarketing",
  "#content",
  "#engagement",
  "#branding",
  "#strategy",
  "#growth",
  "#ai",
  "#automation",
]

const bestTimes = [
  { platform: "Instagram", time: "2:00 PM", boost: "+23%" },
  { platform: "Facebook", time: "1:00 PM", boost: "+18%" },
  { platform: "LinkedIn", time: "9:00 AM", boost: "+31%" },
  { platform: "Twitter", time: "12:00 PM", boost: "+15%" },
]

const platforms = [
  { id: "instagram", name: "Instagram", color: "from-purple-500 to-pink-500", limit: 2200 },
  { id: "facebook", name: "Facebook", color: "from-blue-600 to-blue-700", limit: 63206 },
  { id: "linkedin", name: "LinkedIn", color: "from-blue-600 to-blue-800", limit: 3000 },
  { id: "twitter", name: "Twitter", color: "from-gray-800 to-black", limit: 280 },
]

export function ContentCreationPage() {
  const [goal, setGoal] = useState("")
  const [content, setContent] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("instagram")
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setContent(
        "🚀 Exciting news! Our latest product launch is here and we couldn't be more thrilled to share it with you. \n\nThis innovative solution will transform how you approach social media marketing. With AI-powered insights and automation, you'll see results like never before.\n\nWhat are you most excited about? Let us know in the comments! 👇",
      )
      setSelectedHashtags(["#productlaunch", "#innovation", "#socialmedia", "#ai"])
      setIsGenerating(false)
    }, 2500)
  }

  const addHashtag = (tag: string) => {
    if (!selectedHashtags.includes(tag)) {
      setSelectedHashtags([...selectedHashtags, tag])
    }
  }

  const removeHashtag = (tag: string) => {
    setSelectedHashtags(selectedHashtags.filter((t) => t !== tag))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      // Show success message
    }, 1000)
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      // Show success message
    }, 2000)
  }

  const getCharacterCount = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId)
    const totalContent = content + " " + selectedHashtags.join(" ")
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
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Content Editor - Left Side (60%) */}
      <div className="lg:col-span-3 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">✨ Create New Content</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-transparent hover:bg-muted/50"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button
              className="gradient-primary text-white hover:shadow-xl transition-all duration-300"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Publish
            </Button>
          </div>
        </div>

        {/* Goal Input */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">What's your goal?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Increase engagement for product launch, Drive traffic to website, Build brand awareness..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-24 bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary text-base"
            />
          </CardContent>
        </Card>

        {/* AI Generation */}
        <Card className="glass-card">
          <CardContent className="pt-8">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-16 gradient-primary text-white text-lg font-semibold hover:shadow-xl transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Generating Content...
                </>
              ) : (
                <>
                  <Bot className="h-6 w-6 mr-3" />🤖 Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-800">Content</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your content here or use AI generation..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-48 bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary resize-none text-base"
            />
          </CardContent>
        </Card>

        {/* Media Upload */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium text-gray-700 mb-2">Drag and drop your images or videos here</p>
              <p className="text-gray-500 mb-4">Support for JPG, PNG, MP4, and GIF files</p>
              <Button variant="outline" className="bg-transparent hover:bg-muted/50">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hashtags */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {selectedHashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer px-3 py-1"
                  onClick={() => removeHashtag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium text-gray-700 mb-3 block">AI Suggestions</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedHashtags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted/50 px-3 py-1"
                    onClick={() => addHashtag(tag)}
                  >
                    {tag} +
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-medium text-gray-700">Date</Label>
                <Input
                  type="date"
                  className="bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary mt-2"
                />
              </div>
              <div>
                <Label className="text-base font-medium text-gray-700">Time</Label>
                <Input
                  type="time"
                  className="bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary mt-2"
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-700 mb-3 block">
                <Clock className="h-4 w-4 inline mr-2" />
                Best Times (AI Recommended)
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {bestTimes.map((time) => (
                  <Badge
                    key={time.platform}
                    variant="outline"
                    className="justify-between p-3 cursor-pointer hover:bg-success/10 hover:border-success transition-colors"
                  >
                    <span className="font-medium">{time.platform}</span>
                    <span className="text-success font-semibold">
                      {time.time} {time.boost}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Previews - Right Side (40%) */}
      <div className="lg:col-span-2 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">Platform Previews</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1">
            {platforms.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {platforms.map((platform) => {
            const charCount = getCharacterCount(platform.id)

            return (
              <TabsContent key={platform.id} value={platform.id} className="space-y-6">
                {/* Character Count */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-gray-700">Character Count</span>
                  <Badge
                    variant="outline"
                    className={`${getCountColor(charCount.percentage)} border-current font-semibold`}
                  >
                    {charCount.count} / {charCount.limit}
                  </Badge>
                </div>

                {/* Platform Preview */}
                <Card className="glass-card max-w-sm mx-auto">
                  {platform.id === "instagram" && <InstagramPreview content={content} hashtags={selectedHashtags} />}
                  {platform.id === "facebook" && <FacebookPreview content={content} hashtags={selectedHashtags} />}
                  {platform.id === "linkedin" && <LinkedInPreview content={content} hashtags={selectedHashtags} />}
                  {platform.id === "twitter" && <TwitterPreview content={content} hashtags={selectedHashtags} />}
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}

// Platform Preview Components
function InstagramPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-0">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div>
          <p className="font-semibold text-sm">socialai_pro</p>
          <p className="text-xs text-muted-foreground">Sponsored</p>
        </div>
        <MoreHorizontal className="h-4 w-4 ml-auto" />
      </div>

      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-20 h-20 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-3">📸</div>
          <p className="text-sm font-medium">Your image will appear here</p>
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
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
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

        <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-20 h-20 bg-white/50 rounded-xl flex items-center justify-center mx-auto mb-3">🖼️</div>
            <p className="text-sm font-medium">Your media will appear here</p>
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
            <div className="w-20 h-20 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">📊</div>
            <p className="text-sm font-medium">Professional content preview</p>
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

            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">🐦</div>
                <p className="text-sm font-medium">Media preview</p>
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
