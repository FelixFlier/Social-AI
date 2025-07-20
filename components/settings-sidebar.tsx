"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, User, CreditCard, Key, Palette, Bell } from "lucide-react"

const settingsTabs = [
  {
    id: "integrations",
    label: "Integrations",
    icon: Link,
    badge: null,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    badge: null,
  },
  {
    id: "billing",
    label: "Billing & Plans",
    icon: CreditCard,
    badge: null,
  },
  {
    id: "api",
    label: "API & Webhooks",
    icon: Key,
    badge: null,
  },
  {
    id: "brand",
    label: "Brand Settings",
    icon: Palette,
    badge: null,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    badge: 3,
  },
]

interface SettingsSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <div className="w-64 bg-muted/30 border-r border-border/50 p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground mb-4">⚙️ Settings</h2>

        {settingsTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{tab.label}</span>
            {tab.badge && (
              <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                {tab.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
