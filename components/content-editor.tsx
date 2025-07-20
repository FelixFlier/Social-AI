"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, Send, Bot, Upload, Hash, Calendar, Clock, Bold, Italic, Link, ImageIcon, Smile } from "lucide-react"

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

export function ContentEditor() {
  const [goal, setGoal] = useState("")
  const [content, setContent] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setContent(
        "🚀 Exciting news! Our latest product launch is here and we couldn't be more thrilled to share it with you. \n\nThis innovative solution will transform how you approach social media marketing. With AI-powered insights and automation, you'll see results like never before.\n\nWhat are you most excited about? Let us know in the comments! 👇",
      )
      setSelectedHashtags(["#productlaunch", "#innovation", "#socialmedia", "#ai"])
      setIsGenerating(false)
    }, 2000)
  }

  const addHashtag = (tag: string) => {
    if (!selectedHashtags.includes(tag)) {
      setSelectedHashtags([...selectedHashtags, tag])
    }
  }

  const removeHashtag = (tag: string) => {
    setSelectedHashtags(selectedHashtags.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">✨ Create New Content</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-transparent">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button className="gradient-primary text-white">
            <Send className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Goal Input */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">What's your goal?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., Increase engagement for product launch, Drive traffic to website, Build brand awareness..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="min-h-20 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </CardContent>
      </Card>

      {/* AI Generation */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-12 gradient-primary text-white text-lg font-medium"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Content...
              </>
            ) : (
              <>
                <Bot className="h-5 w-5 mr-2" />🤖 Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Content Editor */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
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
            className="min-h-40 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary resize-none"
          />
        </CardContent>
      </Card>

      {/* Media Upload */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">Drag and drop your images or videos here</p>
            <Button variant="outline" className="bg-transparent">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hashtags */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {selectedHashtags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                onClick={() => removeHashtag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>

          <Separator />

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">AI Suggestions</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted/50"
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
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input type="date" className="bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary" />
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" className="bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary" />
            </div>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              <Clock className="h-4 w-4 inline mr-1" />
              Best Times (AI Recommended)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {bestTimes.map((time) => (
                <Badge
                  key={time.platform}
                  variant="outline"
                  className="justify-between p-2 cursor-pointer hover:bg-success/10 hover:border-success"
                >
                  <span>{time.platform}</span>
                  <span className="text-success font-medium">
                    {time.time} {time.boost}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
