"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Settings, RefreshCw, BarChart3, AlertCircle } from "lucide-react"

interface PlatformCardProps {
  platform: {
    id: string
    name: string
    icon: string
    connected: boolean
    accountName?: string
    followers?: string
    lastSync?: string
    color: string
  }
  onConnect: (platformId: string) => void
  onManage: (platformId: string) => void
  onRefresh: (platformId: string) => void
  onInsights?: (platformId: string) => void
}

export function PlatformCard({ platform, onConnect, onManage, onRefresh, onInsights }: PlatformCardProps) {
  return (
    <Card
      className={`glass-card transition-all duration-200 hover:scale-105 ${
        platform.connected ? "border-success/30" : "border-muted-foreground/30"
      }`}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{platform.icon}</div>
              <div>
                <h3 className="font-semibold text-foreground">{platform.name}</h3>
                {platform.connected ? (
                  <div className="flex items-center gap-1 text-success text-sm">
                    <CheckCircle className="h-3 w-3" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>Not Connected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Info */}
          {platform.connected && (
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Account: </span>
                <span className="font-medium">{platform.accountName}</span>
              </div>
              {platform.followers && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Followers: </span>
                  <span className="font-medium">{platform.followers}</span>
                </div>
              )}
              {platform.lastSync && <div className="text-sm text-muted-foreground">Last sync: {platform.lastSync}</div>}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {platform.connected ? (
              <>
                <Button size="sm" variant="outline" onClick={() => onManage(platform.id)} className="bg-transparent">
                  <Settings className="h-3 w-3 mr-1" />
                  Manage
                </Button>
                <Button size="sm" variant="outline" onClick={() => onRefresh(platform.id)} className="bg-transparent">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
                {onInsights && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onInsights(platform.id)}
                    className="bg-transparent"
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Insights
                  </Button>
                )}
              </>
            ) : (
              <Button
                size="sm"
                className="w-full"
                style={{ backgroundColor: platform.color, color: "white" }}
                onClick={() => onConnect(platform.id)}
              >
                🔗 Connect Account
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
