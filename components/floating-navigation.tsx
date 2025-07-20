"use client"

import { Button } from "@/components/ui/button"
import { Home, Edit, BarChart3, Bot, Settings } from "lucide-react"

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    id: "content",
    label: "Content",
    icon: Edit,
    href: "/content",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    id: "ai-strategy",
    label: "AI Strategy",
    icon: Bot,
    href: "/ai-strategy",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

interface FloatingNavigationProps {
  activeItem?: string
  onPageChange: (page: string) => void
}

export function FloatingNavigation({ activeItem = "dashboard", onPageChange }: FloatingNavigationProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="max-w-2xl bg-white/80 backdrop-blur-lg border border-gray-200 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center space-x-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`transition-all duration-200 ${
                activeItem === item.id
                  ? "bg-primary-500 text-white rounded-full px-4 py-2 hover:bg-primary-600"
                  : "text-gray-600 hover:text-primary-500 px-4 py-2 hover:bg-primary-50 rounded-full"
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}
