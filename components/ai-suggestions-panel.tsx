"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Clock, Hash, Target, Zap } from "lucide-react"

const suggestions = [
  {
    id: 1,
    icon: Hash,
    title: "Add 2 more hashtags for +15% reach",
    description: "Include #contentmarketing and #digitalstrategy",
    impact: "+15% reach",
    type: "hashtags",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    icon: Clock,
    title: "Post at 2PM for +23% engagement",
    description: "Your audience is most active at this time",
    impact: "+23% engagement",
    type: "timing",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    icon: Target,
    title: "Include question for better comments",
    description: "Add 'What's your experience?' to boost interaction",
    impact: "+40% comments",
    type: "engagement",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Add trending emoji for visibility",
    description: "🚀 and ✨ are performing well this week",
    impact: "+8% visibility",
    type: "content",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export function AISuggestionsPanel() {
  const [appliedSuggestions, setAppliedSuggestions] = useState<number[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const applySuggestion = (id: number) => {
    setAppliedSuggestions([...appliedSuggestions, id])
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 max-w-4xl mx-auto">
      <Card className="glass-card shadow-2xl border-2 border-white/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />🎯 AI Suggestions
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            {suggestions.map((suggestion) => {
              const isApplied = appliedSuggestions.includes(suggestion.id)

              return (
                <div
                  key={suggestion.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    isApplied
                      ? "bg-success/10 border-success/30"
                      : `${suggestion.bgColor} border-transparent hover:shadow-md`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${isApplied ? "bg-success/20" : "bg-white/80"}`}>
                      <suggestion.icon className={`h-4 w-4 ${isApplied ? "text-success" : suggestion.color}`} />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-foreground">{suggestion.title}</h4>
                        <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${isApplied ? "bg-success/20 text-success" : ""}`}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          {suggestion.impact}
                        </Badge>

                        <Button
                          size="sm"
                          variant={isApplied ? "secondary" : "default"}
                          onClick={() => applySuggestion(suggestion.id)}
                          disabled={isApplied}
                          className={`text-xs h-7 ${
                            isApplied ? "bg-success/20 text-success hover:bg-success/30" : "gradient-primary text-white"
                          }`}
                        >
                          {isApplied ? "Applied ✓" : "Apply"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Auto-save enabled</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Performance Score:</span>
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">87/100</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
