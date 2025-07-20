import { create } from 'zustand'
import { v4 as uuid } from 'uuid';

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isTyping?: boolean
  attachments?: File[]
  component?: 'StrategyCard' | 'TimelineVisualization' | 'PlatformRecommendationChart'
  componentProps?: any
}

interface ChatState {
  messages: Message[]
  isTyping: boolean
  currentStrategy: any
  sendMessage: (content: string) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isTyping: false,
  currentStrategy: null,
  sendMessage: async (content: string) => {
    // Add user message
    const userMessage: Message = { id: uuid(), type: 'user', content, timestamp: new Date() }
    set(state => ({ messages: [...state.messages, userMessage] }))

    // Show typing indicator
    set({ isTyping: true })

    // API call to n8n AI Strategy webhook
    const response = await fetch('/api/ai/strategy', {
      method: 'POST',
      body: JSON.stringify({ message: content, history: get().messages })
    })

    const aiResponse = await response.json()
    const aiMessage: Message = {
      id: uuid(),
      type: 'ai',
      content: aiResponse.content,
      timestamp: new Date()
    }

    set(state => ({
      messages: [...state.messages, aiMessage],
      isTyping: false,
      currentStrategy: aiResponse.strategy || state.currentStrategy
    }))
  }
}))
