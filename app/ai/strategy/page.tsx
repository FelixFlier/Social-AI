import { PremiumAIChat } from "@/components/premium-ai-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, Target, TrendingUp, BarChart3 } from "lucide-react"

export default function AIStrategyPage() {
  return (
    <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
      {/* Left Panel - Chat Interface (65%) */}
      <div className="lg:col-span-3">
        <PremiumAIChat />
      </div>

      {/* Right Panel - Strategy Visualization (35%) */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto">
        {/* Strategy Map */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <BarChart3 className="h-5 w-5 text-primary-500" />
              Your Strategy Map
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium text-gray-900">46% Complete</span>
              </div>
              <Progress value={46} className="h-2" />
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {[
                {
                  week: 1,
                  title: "Foundation & Awareness",
                  theme: "Teaser content & thought leadership",
                  progress: 100,
                  status: "completed",
                  posts: 7,
                },
                {
                  week: 2,
                  title: "Feature Showcase",
                  theme: "Product highlights & demos",
                  progress: 85,
                  status: "in-progress",
                  posts: 7,
                },
                {
                  week: 3,
                  title: "Social Proof",
                  theme: "Customer testimonials & case studies",
                  progress: 0,
                  status: "upcoming",
                  posts: 7,
                },
                {
                  week: 4,
                  title: "Launch & Convert",
                  theme: "Announcement & special offers",
                  progress: 0,
                  status: "upcoming",
                  posts: 7,
                },
              ].map((phase) => (
                <div key={phase.week} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {phase.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-secondary-500" />
                      ) : phase.status === "in-progress" ? (
                        <div className="h-4 w-4 rounded-full bg-primary-500 animate-pulse" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      {phase.week < 4 && <div className="w-px h-12 bg-gray-200 mt-2" />}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm text-gray-900">
                            Week {phase.week}: {phase.title}
                          </h4>
                          <Badge
                            className={`text-xs ${
                              phase.status === "completed"
                                ? "bg-secondary-50 text-secondary-600 border-secondary-200"
                                : phase.status === "in-progress"
                                  ? "bg-primary-50 text-primary-600 border-primary-200"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {phase.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{phase.theme}</p>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">{phase.posts} posts planned</span>
                          <span className="text-gray-900">{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Content Ideas */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Target className="h-5 w-5 text-secondary-500" />
              Generated Content Ideas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {[
                "LinkedIn: 'The Future of SaaS: 5 Trends Shaping 2024'",
                "Twitter: 'Behind the scenes: Building our new feature'",
                "LinkedIn: 'Case Study: How Company X increased ROI by 300%'",
                "Twitter: 'Quick tip: Automate your social media in 5 minutes'",
                "Facebook: 'Customer spotlight: Success story video'",
                "LinkedIn: 'Industry report: Social Media Marketing Statistics'",
              ].map((idea, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm">
                  {idea}
                </div>
              ))}
            </div>

            <Button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Create These Posts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
