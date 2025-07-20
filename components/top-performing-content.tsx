"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, TrendingUp, Heart, MessageCircle, Share2 } from "lucide-react"

export function TopPerformingContent() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />🏆 Top Performing Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 p-4">
          {/* Thumbnail placeholder */}
          <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 bg-gradient-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                🎥
              </div>
              <p className="text-sm font-medium">Behind the scenes video</p>
            </div>
          </div>

          {/* Content info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Instagram</Badge>
              <Badge className="bg-blue-600 text-white">LinkedIn</Badge>
            </div>

            <h4 className="font-semibold text-foreground">
              "Behind the scenes: How we built our AI-powered social media tool"
            </h4>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                  <Heart className="h-4 w-4" />
                  <span className="font-semibold">12.4K</span>
                </div>
                <p className="text-xs text-muted-foreground">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-semibold">892</span>
                </div>
                <p className="text-xs text-muted-foreground">Comments</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                  <Share2 className="h-4 w-4" />
                  <span className="font-semibold">456</span>
                </div>
                <p className="text-xs text-muted-foreground">Shares</p>
              </div>
            </div>

            {/* Engagement rate */}
            <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="font-semibold text-success">89% Engagement Rate</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="gradient-primary text-white">
            <RefreshCw className="h-4 w-4 mr-2" />🔄 Reuse Template
          </Button>
          <Button variant="outline" className="bg-transparent">
            <TrendingUp className="h-4 w-4 mr-2" />📈 View Details
          </Button>
        </div>

        {/* Additional top posts */}
        <div className="pt-4 border-t border-border/50 space-y-3">
          <h5 className="font-medium text-sm text-muted-foreground">Other Top Posts</h5>
          {[
            { title: "Product launch announcement", engagement: "76%", platform: "LinkedIn" },
            { title: "Customer success story", engagement: "68%", platform: "Facebook" },
          ].map((post, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">{post.platform}</p>
              </div>
              <Badge variant="outline" className="text-success border-success">
                {post.engagement}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
