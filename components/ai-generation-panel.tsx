"use client"

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContentStore } from '@/lib/content-store'
import { Bot, Loader2 } from 'lucide-react'

const AIGenerationPanel = () => {
  const { generateContent, isGenerating: isGeneratingStore } = useContentStore()
  const [prompt, setPrompt] = useState("")
  const [contentType, setContentType] = useState("post")
  const [brandVoice, setBrandVoice] = useState("professional")
  const [platform, setPlatform] = useState("all")
  const [length, setLength] = useState("medium")

  const mutation = useMutation({
    mutationFn: async () => {
        await generateContent({ prompt, contentType, brandVoice, platform, length })
    },
  })

  const handleGenerate = () => {
    mutation.mutate()
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2"><Bot /> AI Content Generation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter a prompt for the AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24 bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary text-base"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger><SelectValue placeholder="Content Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="post">Post</SelectItem>
              <SelectItem value="caption">Caption</SelectItem>
              <SelectItem value="thread">Thread</SelectItem>
              <SelectItem value="story">Story</SelectItem>
            </SelectContent>
          </Select>
          <Select value={brandVoice} onValueChange={setBrandVoice}>
            <SelectTrigger><SelectValue placeholder="Brand Voice" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger><SelectValue placeholder="Platform" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={length} onValueChange={setLength}>
            <SelectTrigger><SelectValue placeholder="Length" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleGenerate} disabled={mutation.isPending || isGeneratingStore} className="w-full">
          {mutation.isPending || isGeneratingStore ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
          Generate
        </Button>
      </CardContent>
    </Card>
  )
}

export default AIGenerationPanel
