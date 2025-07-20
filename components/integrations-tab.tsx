"use client"

import { PlatformCard } from "./platform-card"
import { AIConfiguration } from "./ai-configuration"
import { ThirdPartyIntegrations } from "./third-party-integrations"

const socialPlatforms = [
  {
    id: "facebook",
    name: "Facebook Business",
    icon: "📘",
    connected: true,
    accountName: "Your Business",
    lastSync: "2 min ago",
    color: "#1877f2",
  },
  {
    id: "instagram",
    name: "Instagram Creator",
    icon: "📸",
    connected: true,
    accountName: "@yourbrand",
    followers: "3.2K followers synced",
    lastSync: "5 min ago",
    color: "#E4405F",
  },
  {
    id: "linkedin",
    name: "LinkedIn Company",
    icon: "💼",
    connected: false,
    color: "#0077b5",
  },
  {
    id: "twitter",
    name: "Twitter/X Business",
    icon: "🐦",
    connected: true,
    accountName: "@yourbrand",
    lastSync: "1 min ago",
    color: "#000000",
  },
]

export function IntegrationsTab() {
  const handleConnect = (platformId: string) => {
    console.log("Connect platform:", platformId)
  }

  const handleManage = (platformId: string) => {
    console.log("Manage platform:", platformId)
  }

  const handleRefresh = (platformId: string) => {
    console.log("Refresh platform:", platformId)
  }

  const handleInsights = (platformId: string) => {
    console.log("View insights for:", platformId)
  }

  const handleThirdPartyConnect = (serviceId: string) => {
    console.log("Connect service:", serviceId)
  }

  const handleThirdPartyManage = (serviceId: string) => {
    console.log("Manage service:", serviceId)
  }

  return (
    <div className="space-y-8">
      {/* Social Media Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">📱 Social Media Accounts</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {socialPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onConnect={handleConnect}
              onManage={handleManage}
              onRefresh={handleRefresh}
              onInsights={platform.id === "instagram" ? handleInsights : undefined}
            />
          ))}
        </div>
      </div>

      {/* AI Configuration */}
      <AIConfiguration />

      {/* Third-party Integrations */}
      <ThirdPartyIntegrations onConnect={handleThirdPartyConnect} onManage={handleThirdPartyManage} />
    </div>
  )
}
