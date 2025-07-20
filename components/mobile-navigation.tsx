"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Plus, Calendar, BarChart3, User } from "lucide-react"

const navigationTabs = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
    badge: null,
  },
  {
    id: "create",
    label: "Create",
    icon: Plus,
    href: "/content",
    badge: null,
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
    badge: 3,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    badge: null,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/settings",
    badge: null,
  },
]

interface MobileNavigationProps {
  activeTab?: string
}

export function MobileNavigation({ activeTab = "home" }: MobileNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationTabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`relative flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 ${
              currentTab === tab.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <div className="relative">
              <tab.icon
                className={`h-5 w-5 ${currentTab === tab.id ? "scale-110" : ""} transition-transform duration-200`}
              />
              {tab.badge && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {tab.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
            {currentTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
