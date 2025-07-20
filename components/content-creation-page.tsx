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
import { useMediaQuery } from "@/hooks/use-media-query"
import MobileContentEditor from "./mobile-content-editor"
import { useContentStore } from "@/lib/content-store"
import SmartScheduler from "./smart-scheduler"
import MediaUpload from "./media-upload"
import AIGenerationPanel from "./ai-generation-panel"
import AdvancedEditor from "./advanced-editor"
import { InstagramPreview } from "./previews/instagram-preview"
import { FacebookPreview } from "./previews/facebook-preview"
import { LinkedInPreview } from "./previews/linkedin-preview"
import { TwitterPreview } from "./previews/twitter-preview"
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
  const { currentPost, updatePost, generateContent, saveDraft, isGenerating } = useContentStore()
  const [goal, setGoal] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("instagram")
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleGenerate = async () => {
    await generateContent({ prompt: goal })
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
    saveDraft()
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
    const totalContent = (currentPost.content || "") + " " + selectedHashtags.join(" ")
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

  if (isMobile) {
    return <MobileContentEditor />
  }

  return (
    <Tabs defaultValue="create" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="create">Create Post</TabsTrigger>
        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <div className="grid gap-8 lg:grid-cols-5 mt-4">
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
            <AIGenerationPanel />

            {/* Content Editor */}
            <AdvancedEditor
              value={currentPost.content || ""}
              onChange={(content) => updatePost({ content })}
              platformLimit={platforms.find(p => p.id === activeTab)?.limit || 0}
            />

            {/* Media Upload */}
            <MediaUpload onUpload={(files) => updatePost({ media: files })} />

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
            <SmartScheduler onSchedule={(date) => updatePost({ scheduledTime: date })} />
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
                      {platform.id === "instagram" && <InstagramPreview content={currentPost.content || ""} hashtags={selectedHashtags} />}
                      {platform.id === "facebook" && <FacebookPreview content={currentPost.content || ""} hashtags={selectedHashtags} />}
                      {platform.id === "linkedin" && <LinkedInPreview content={currentPost.content || ""} hashtags={selectedHashtags} />}
                      {platform.id === "twitter" && <TwitterPreview content={currentPost.content || ""} hashtags={selectedHashtags} />}
                    </Card>
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="campaigns"><Card><CardHeader><CardTitle>Campaigns</CardTitle></CardHeader><CardContent>View and manage your campaigns here.</CardContent></Card></TabsContent>
      <TabsContent value="templates"><Card><CardHeader><CardTitle>Templates</CardTitle></CardHeader><CardContent>Create and use content templates.</CardContent></Card></TabsContent>
      <TabsContent value="drafts"><Card><CardHeader><CardTitle>Drafts</CardTitle></CardHeader><CardContent>Your saved drafts will appear here.</CardContent></Card></TabsContent>
    </Tabs>
  )
}
