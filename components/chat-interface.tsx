"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Plus, Calendar, RefreshCw, CheckCircle } from "lucide-react"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(input),
        timestamp: new Date(),
        actions: [
          { label: "Apply This Strategy", icon: <CheckCircle className="h-4 w-4" />, variant: "default" },
          { label: "View Calendar", icon: <Calendar className="h-4 w-4" />, variant: "outline" },
          { label: "Generate Alternative", icon: <RefreshCw className="h-4 w-4" />, variant: "secondary" },
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
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

              <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.type === "ai" ? "bg-muted/50 text-foreground" : "bg-gradient-primary text-white ml-auto"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
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
      <div className="p-6 border-t border-border/50">
        <div className="flex gap-4">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your marketing strategy..."
              className="min-h-[60px] max-h-32 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary resize-none"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="gradient-primary text-white h-[60px] px-6"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
