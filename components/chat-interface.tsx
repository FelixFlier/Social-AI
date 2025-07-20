"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StrategyCard } from "./ai-message-components/strategy-card"
import { TimelineVisualization } from "./ai-message-components/timeline-visualization"
import { PlatformRecommendationChart } from "./ai-message-components/platform-recommendation-chart"
import InteractiveInputBar from "./interactive-input-bar"
import { Send, Bot, User, Plus, Calendar, RefreshCw, CheckCircle, Copy, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: Date
  isTyping?: boolean
  attachments?: File[]
  component?: 'StrategyCard' | 'TimelineVisualization' | 'PlatformRecommendationChart'
  componentProps?: any
  actions?: Array<{
    label:string
    icon: React.ReactNode
    variant: "default" | "outline" | "secondary"
  }>
}

const suggestedQuestions = [
  "Create launch strategy",
  "Optimize posting times",
  "Analyze competitors",
  "Improve engagement rates",
  "Plan content calendar",
  "Target audience insights",
]

const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content:
      "Hi! I'm your marketing strategist. I help create data-driven social media strategies that deliver results. What's your main goal for the next quarter?",
    timestamp: new Date(),
  },
]

export function ChatInterface({ messages, onSendMessage, isTyping, startNewChat }: { messages: Message[], onSendMessage: (msg: string) => void, isTyping: boolean, startNewChat: () => void }) {
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    onSendMessage(input)
    setInput("")
  }

  const generateAIResponse = (userInput: string): string => {
    if (userInput.toLowerCase().includes("saas") || userInput.toLowerCase().includes("signup")) {
      return `Perfect! For a SaaS launch, I recommend:

• **70% LinkedIn** (B2B audience targeting)
• **20% Twitter** (tech community engagement)  
• **10% Facebook** (retargeting campaigns)

**4-Week Strategy Breakdown:**
Week 1: Teaser content & thought leadership
Week 2: Feature highlights & demos
Week 3: Customer testimonials & case studies
Week 4: Launch announcement & special offers

I'll create a detailed content calendar with 28 posts optimized for each platform. Want to see the timeline?`
    }

    if (userInput.toLowerCase().includes("engagement")) {
      return `Great question! Here's my data-driven approach to boost engagement:

**Content Mix Strategy:**
• 40% Educational content (how-to, tips)
• 30% Behind-the-scenes content
• 20% User-generated content
• 10% Promotional content

**Optimal Posting Times:**
• LinkedIn: 9 AM - 10 AM (weekdays)
• Instagram: 2 PM - 3 PM (weekdays)
• Twitter: 12 PM - 1 PM (daily)

**Engagement Tactics:**
• Ask questions in every post
• Use polls and interactive content
• Respond within 2 hours
• Create shareable infographics

This strategy typically increases engagement by 45-60% within 30 days.`
    }

    return `I understand you're looking for strategic guidance. Based on current market trends and best practices, I recommend focusing on:

**Key Areas:**
• Content strategy optimization
• Audience targeting refinement  
• Platform-specific approaches
• Performance measurement

Let me know more about your specific goals, target audience, and current challenges so I can provide more tailored recommendations.`
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    textareaRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const startNewChat = () => {
    setMessages(initialMessages)
    setInput("")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-primary text-white">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">🤖 Marketing Strategy AI</h2>
            <p className="text-sm text-muted-foreground">Your personal marketing strategist</p>
          </div>
        </div>
        <Button onClick={startNewChat} variant="outline" className="bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "ai" && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}

              <div className={`group relative max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.type === "ai" ? "bg-muted/50 text-foreground" : "bg-gradient-primary text-white ml-auto"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  {message.component === 'StrategyCard' && <StrategyCard {...message.componentProps} />}
                  {message.component === 'TimelineVisualization' && <TimelineVisualization {...message.componentProps} />}
                  {message.component === 'PlatformRecommendationChart' && <PlatformRecommendationChart {...message.componentProps} />}
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(message.content)}>
                                <Copy className="mr-2 h-4 w-4" /> Copy
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {message.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.actions.map((action, index) => (
                      <Button key={index} variant={action.variant} size="sm" className="text-xs">
                        {action.icon}
                        <span className="ml-1">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                )}

                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              {message.type === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <div className="px-6 py-4 border-t border-border/50">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors"
              onClick={() => handleSuggestedQuestion(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <InteractiveInputBar onSendMessage={handleSend} isTyping={isTyping} />
    </div>
  )
}
