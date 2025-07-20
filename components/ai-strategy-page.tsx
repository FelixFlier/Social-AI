"use client"

import { useChatStore } from "@/lib/chat-store"
import { ChatInterface } from "@/components/chat-interface"
import { StrategyVisualization } from "@/components/strategy-visualization"

/**
 * The main AI Strategy page component.
 * Exports both a named and default export so it can be imported either way:
 *   import { AIStrategyPage } from "@/components/ai-strategy-page"
 *   import AIStrategyPage from "@/components/ai-strategy-page"
 */
export function AIStrategyPage() {
  const { messages, sendMessage, isTyping, currentStrategy } = useChatStore()

  const startNewChat = () => {
    // This should be implemented in the store
    console.log("Starting new chat")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      <div className="lg:col-span-2">
        <ChatInterface
          messages={messages}
          onSendMessage={sendMessage}
          isTyping={isTyping}
          startNewChat={startNewChat}
        />
      </div>
      <div className="lg:col-span-1">
        <StrategyVisualization strategy={currentStrategy} />
      </div>
    </div>
  )
}

export default AIStrategyPage
