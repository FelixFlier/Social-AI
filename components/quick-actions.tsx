"use client"

import { Plus, Calendar, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    label: "✨ Create Post",
    icon: Plus,
    gradient: "from-primary to-secondary",
    action: () => console.log("Create post"),
  },
  {
    label: "📅 Schedule Campaign",
    icon: Calendar,
    gradient: "from-secondary to-accent",
    action: () => console.log("Schedule campaign"),
  },
  {
    label: "🤖 AI Strategy",
    icon: Bot,
    gradient: "from-accent to-success",
    action: () => console.log("AI strategy"),
  },
]

export function QuickActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.action}
            className={`
              h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300
              bg-gradient-to-r ${action.gradient} text-white font-medium
              hover:scale-110 group
            `}
          >
            <action.icon className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
