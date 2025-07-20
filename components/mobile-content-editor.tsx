"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, Send, Sparkles } from "lucide-react"

const aiPrompts = [
    { id: 1, title: "Generate a post" },
    { id: 2, title: "Write a caption" },
    { id: 3, title: "Create a thread" },
]

const platformLimits = {
    instagram: 2200,
    facebook: 63206,
    linkedin: 3000,
    twitter: 280,
}

const MobileContentEditor = () => {
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [activeTab, setActiveTab] = useState('compose')
  const [content, setContent] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')

  const isPostReady = content.length > 0

  const generateFromPrompt = (prompt: any) => {
    //
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b z-10 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">Create Post</h1>
          <Button size="sm" disabled={!isPostReady}>
            Schedule
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto px-4">
          {['compose', 'media', 'preview', 'schedule'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4">
        {activeTab === 'compose' && (
          <div className="space-y-4">
            {/* AI Generation Quick Actions */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {aiPrompts.map(prompt => (
                <Button
                  key={prompt.id}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => generateFromPrompt(prompt)}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {prompt.title}
                </Button>
              ))}
            </div>

            {/* Text Editor */}
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] text-base resize-none" // Larger text für mobile
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setShowKeyboard(true)}
              onBlur={() => setShowKeyboard(false)}
            />

            {/* Character Counter */}
            <div className="flex justify-between text-sm text-gray-500">
              <span>Platform: {selectedPlatform}</span>
              <span>{content.length}/{platformLimits[selectedPlatform as keyof typeof platformLimits]}</span>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <p>Media Uploader</p>
        )}

        {activeTab === 'preview' && (
          <p>Platform Previews</p>
        )}

        {activeTab === 'schedule' && (
          <p>Scheduling Interface</p>
        )}
      </div>

      {/* Bottom Action Bar - zeigt nur wenn nicht Keyboard active */}
      {!showKeyboard && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Schedule Post
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileContentEditor;
