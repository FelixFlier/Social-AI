"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Loader, Check, X, Icon } from "lucide-react"

interface QuickActionCardProps {
  title: string
  description: string
  icon: Icon
  color: string
  action: () => Promise<boolean>
  userPlan: "Free" | "Pro" | "Agency"
  requiredPlan?: "Pro" | "Agency"
}

const QuickActionCard = ({ title, description, icon: Icon, color, action, userPlan, requiredPlan }: QuickActionCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null)

  const isLocked = requiredPlan && (userPlan === "Free" || (requiredPlan === "Agency" && userPlan === "Pro"))

  const handleClick = async () => {
    if (isLoading || feedback || isLocked) return

    setIsLoading(true)
    const result = await action()
    setFeedback(result ? "success" : "error")
    setIsLoading(false)

    setTimeout(() => setFeedback(null), 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="h-full"
    >
      <Card
        className={`glass-card transition-all duration-300 cursor-pointer group h-full flex flex-col justify-center ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isLocked ? -1 : 0}
        role="button"
        aria-label={title}
      >
        <CardContent className="p-8 text-center">
          <motion.div
            className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4 transition-transform duration-300`}
            animate={{ scale: isLoading ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isLoading ? <Loader className="h-8 w-8 text-white animate-spin" /> :
             feedback === "success" ? <Check className="h-8 w-8 text-white" /> :
             feedback === "error" ? <X className="h-8 w-8 text-white" /> :
             <Icon className="h-8 w-8 text-white" />}
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
          {isLocked && <div className="mt-2 text-xs font-bold text-primary">Upgrade to {requiredPlan}</div>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default QuickActionCard
