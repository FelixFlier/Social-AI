import { CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share } from "lucide-react"

export function TwitterPreview({ content, hashtags }: { content: string; hashtags: string[] }) {
  return (
    <CardContent className="p-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold flex-shrink-0">
          SP
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-sm">SocialAI Pro</p>
            <p className="text-muted-foreground text-sm">@socialai_pro</p>
            <span className="text-muted-foreground text-sm">•</span>
            <p className="text-muted-foreground text-sm">2h</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm">{content}</p>
            <div className="flex flex-wrap gap-1">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">🐦</div>
                <p className="text-sm font-medium">Media preview</p>
              </div>
            </div>

            <div className="flex items-center justify-between max-w-md pt-2">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 text-sm">
                <MessageCircle className="h-4 w-4" /> 12
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 text-sm">
                <Share className="h-4 w-4" /> 5
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 text-sm">
                <Heart className="h-4 w-4" /> 48
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 text-sm">
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
