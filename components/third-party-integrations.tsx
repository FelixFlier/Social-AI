"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink } from "lucide-react"

const thirdPartyServices = [
  {
    id: "shopify",
    name: "Shopify",
    icon: "🛍️",
    description: "Sync products and create promotional content",
    connected: true,
    color: "#96bf48",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    icon: "📧",
    description: "Integrate email campaigns with social posts",
    connected: false,
    color: "#ffe01b",
  },
  {
    id: "analytics",
    name: "Google Analytics",
    icon: "📊",
    description: "Track social media traffic and conversions",
    connected: true,
    color: "#4285f4",
  },
  {
    id: "zapier",
    name: "Zapier",
    icon: "⚡",
    description: "Automate workflows between 5000+ apps",
    connected: false,
    color: "#ff4a00",
  },
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    description: "Get notifications and approvals in Slack",
    connected: true,
    color: "#4a154b",
  },
  {
    id: "canva",
    name: "Canva",
    icon: "🎨",
    description: "Create and import designs directly",
    connected: false,
    color: "#00c4cc",
  },
]

interface ThirdPartyIntegrationsProps {
  onConnect: (serviceId: string) => void
  onManage: (serviceId: string) => void
}

export function ThirdPartyIntegrations({ onConnect, onManage }: ThirdPartyIntegrationsProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>🔗 Advanced Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {thirdPartyServices.map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{service.icon}</div>
                  <div>
                    <h4 className="font-semibold text-sm">{service.name}</h4>
                    {service.connected ? (
                      <div className="flex items-center gap-1 text-success text-xs">
                        <CheckCircle className="h-3 w-3" />
                        <span>Connected</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not connected</span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">{service.description}</p>

              <div className="flex gap-2">
                {service.connected ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => onManage(service.id)} className="bg-transparent">
                      Manage
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => onConnect(service.id)} className="gradient-primary text-white">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
