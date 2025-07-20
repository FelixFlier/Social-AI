"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Plus, CheckCircle } from "lucide-react"

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
]

const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content:
      "Hi! I'm your AI marketing strategist. I help create data-driven social media strategies that deliver results. What's your main goal for the next quarter?",
    timestamp: new Date(),
  },
]

export function PremiumAIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

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
        content: `Perfect! For a SaaS launch, I recommend:

• **70% LinkedIn** (B2B audience targeting)
• **20% Twitter** (tech community engagement)  
• **10% Facebook** (retargeting campaigns)

**4-Week Strategy Breakdown:**
Week 1: Teaser content & thought leadership
Week 2: Feature highlights & demos
Week 3: Customer testimonials & case studies
Week 4: Launch announcement & special offers

I'll create a detailed content calendar with 28 posts optimized for each platform. Want to see the timeline?`,
        timestamp: new Date(),
        actions: [
          { label: "Apply Strategy", icon: <CheckCircle className="h-4 w-4" />, variant: "default" },
          { label: "View Calendar", icon: <Plus className="h-4 w-4" />, variant: "outline" },
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="glass-card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary-500 text-white">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Marketing Strategist</h2>
            <p className="text-sm text-gray-600">Your personal marketing assistant</p>
          </div>
        </div>
        <Button variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
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
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}

              <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                <div
                  className={`p-4 rounded-xl ${
                    message.type === "ai" ? "bg-gray-50 text-gray-900" : "bg-primary-500 text-white ml-auto"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                </div>

                {message.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant === "default" ? "default" : "outline"}
                        size="sm"
                        className={
                          action.variant === "default"
                            ? "bg-primary-500 hover:bg-primary-600 text-white"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }
                      >
                        {action.icon}
                        <span className="ml-1">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              {message.type === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-primary-50 hover:border-primary-500 hover:text-primary-600 transition-colors bg-gray-50 text-gray-600 border-gray-200"
              onClick={() => setInput(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex gap-4">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your marketing strategy..."
              className="min-h-[60px] max-h-32 bg-gray-50 border-gray-200 focus:border-primary-500 resize-none"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-primary-500 hover:bg-primary-600 text-white h-[60px] px-6"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
