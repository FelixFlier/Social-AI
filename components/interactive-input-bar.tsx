"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Mic, Send } from 'lucide-react'

interface InteractiveInputBarProps {
    onSendMessage: (message: string) => void;
    isTyping: boolean;
}

const InteractiveInputBar = ({ onSendMessage, isTyping }: InteractiveInputBarProps) => {
    const [input, setInput] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSend = () => {
        if (!input.trim()) return
        onSendMessage(input)
        setInput("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex items-end gap-3 p-4 border-t bg-white">
            <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
            </Button>
            <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your marketing strategy..."
                className="flex-1 min-h-0 resize-none"
            />
            <Button size="icon" disabled={!input.trim() || isTyping} onClick={handleSend}>
                <Send className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default InteractiveInputBar;
