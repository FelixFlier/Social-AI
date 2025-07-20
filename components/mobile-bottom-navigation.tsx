"use client"

import { Button } from "@/components/ui/button"
import { Home, Plus, BarChart3, Bot, User } from "lucide-react"

const mobileNavItems = [
  {
    id: "dashboard",
    label: "Home",
    icon: Home,
  },
  {
    id: "content",
    label: "Create",
    icon: Plus,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "ai-strategy",
    label: "AI",
    icon: Bot,
  },
  {
    id: "settings",
    label: "Profile",
    icon: User,
  },
]

interface MobileBottomNavigationProps {
  activeItem?: string
  onPageChange: (page: string) => void
}

export function MobileBottomNavigation({ activeItem = "dashboard", onPageChange }: MobileBottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <nav className="bg-white/90 backdrop-blur-lg border-t border-gray-100">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 transition-all duration-200 ${
                activeItem === item.id ? "text-primary-500 bg-primary-50" : "text-gray-600 hover:text-primary-500"
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <item.icon
                className={`h-5 w-5 ${activeItem === item.id ? "scale-110" : ""} transition-transform duration-200`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}
