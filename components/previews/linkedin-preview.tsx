import { CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share } from "lucide-react"

export function LinkedInPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold">
          SP
        </div>
        <div>
          <p className="font-semibold text-sm">SocialAI Pro</p>
          <p className="text-xs text-muted-foreground">AI-Powered Social Media • 1st</p>
          <p className="text-xs text-muted-foreground">2h • 🌍</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-relaxed">{content}</p>
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-700 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded border flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-20 h-20 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">📊</div>
            <p className="text-sm font-medium">Professional content preview</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <Heart className="h-4 w-4" /> Like
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <MessageCircle className="h-4 w-4" /> Comment
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <Share className="h-4 w-4" /> Repost
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700">
            <Share className="h-4 w-4" /> Send
          </button>
        </div>
      </div>
    </CardContent>
  )
}
