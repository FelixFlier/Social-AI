"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Plus, BarChart3, Bot, User, MoreHorizontal, Settings, Compass, LayoutDashboard } from "lucide-react"

const mainNavItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "content", label: "Create", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "ai-strategy", label: "AI", icon: Bot },
]

const secondaryNavItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "templates", label: "Templates", icon: LayoutDashboard },
]

interface MobileBottomNavigationProps {
  activeItem?: string
  onPageChange: (page: string) => void
}

export function MobileBottomNavigation({ activeItem = "dashboard", onPageChange }: MobileBottomNavigationProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handlers = useSwipeable({
        onSwipedUp: () => setIsExpanded(true),
        onSwipedDown: () => setIsExpanded(false),
        trackMouse: true,
      });

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div {...handlers} className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 lg:hidden z-50">
        <div className="flex items-center justify-around">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all",
                activeItem === item.id
                  ? "text-primary bg-primary/10"
                  : "text-gray-500"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}

          {/* More Menu */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-500"
          >
            <MoreHorizontal className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Expandable Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-2xl border p-4 lg:hidden z-50"
          >
            <div className="grid grid-cols-3 gap-4">
              {secondaryNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id)
                    setIsExpanded(false)
                  }}
                  className="flex flex-col items-center py-3 rounded-lg hover:bg-gray-50"
                >
                  <item.icon className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-xs text-gray-600">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
}
