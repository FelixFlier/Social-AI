import { CardContent } from "@/components/ui/card"
import { MoreHorizontal, Heart, MessageCircle, Share, Bookmark } from "lucide-react"

export function InstagramPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-0">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div>
          <p className="font-semibold text-sm">socialai_pro</p>
          <p className="text-xs text-muted-foreground">Sponsored</p>
        </div>
        <MoreHorizontal className="h-4 w-4 ml-auto" />
      </div>

      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-20 h-20 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-3">📸</div>
          <p className="text-sm font-medium">Your image will appear here</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 p-4">
        <Heart className="h-6 w-6" />
        <MessageCircle className="h-6 w-6" />
        <Share className="h-6 w-6" />
        <Bookmark className="h-6 w-6 ml-auto" />
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-sm mb-2">
          <span className="font-semibold">socialai_pro</span> {content}
        </p>
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
  )
}
