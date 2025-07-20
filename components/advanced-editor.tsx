"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import TextareaAutosize from 'react-textarea-autosize'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bold, Italic, Link, Smile } from 'lucide-react'

const schema = z.object({
  content: z.string().min(1, "Content is required").max(2200, "Content is too long"),
})

interface AdvancedEditorProps {
  value: string
  onChange: (value: string) => void
  platformLimit: number
}

const AdvancedEditor = ({ value, onChange, platformLimit }: AdvancedEditorProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    values: { content: value }
  })

  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    onChange(value + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800">Content</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="hover:bg-muted/50"><Bold className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="hover:bg-muted/50"><Italic className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="hover:bg-muted/50"><Link className="h-4 w-4" /></Button>
            <div className="relative">
                <Button variant="ghost" size="sm" className="hover:bg-muted/50" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <Smile className="h-4 w-4" />
                </Button>
                {showEmojiPicker && (
                    <div className="absolute z-10 right-0">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TextareaAutosize
          {...register("content")}
          minRows={3}
          maxRows={10}
          placeholder="Write your content here or use AI generation..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-48 bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary resize-none text-base p-4 rounded-md"
        />
        <div className="text-right text-sm text-muted-foreground mt-2">
            {value.length} / {platformLimit}
        </div>
        {errors.content && <p className="text-destructive text-sm mt-1">{errors.content.message}</p>}
      </CardContent>
    </Card>
  )
}

export default AdvancedEditor
