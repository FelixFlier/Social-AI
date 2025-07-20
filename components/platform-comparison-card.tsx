"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PlatformComparisonCardProps {
  name: string
  followers: string
  reach: string
  engagement: string
  performance: number
  bgColor: string
  iconColor: string
  progressColor: string
  icon: any
}

const PlatformComparisonCard = ({ name, followers, reach, engagement, performance, bgColor, iconColor, progressColor, icon: Icon }: PlatformComparisonCardProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-gray-500">{followers} followers</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reach</span>
            <span className="font-semibold">{reach}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Engagement</span>
            <span className="font-semibold text-green-600">{engagement}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${progressColor}`}
              style={{ width: `${performance}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">Performance vs. goal</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlatformComparisonCard
