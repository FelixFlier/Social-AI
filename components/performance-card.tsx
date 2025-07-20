"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Icon } from "lucide-react"

interface PerformanceCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "neutral" | "negative"
  icon: Icon
  description: string
  color: string
  bgColor: string
  gradient: string
  data: any[]
}

const PerformanceCard = ({ title, value, change, changeType, icon: Icon, description, color, bgColor, gradient, data }: PerformanceCardProps) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))

  return (
    <Card className={`glass-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-full h-full ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 z-10">
        <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
        <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="z-10">
        <motion.div
          className="text-3xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.div>
        <div className="flex items-center gap-2">
          <Badge
            variant={changeType === "positive" ? "default" : "secondary"}
            className={
              changeType === "positive"
                ? "bg-success/10 text-success hover:bg-success/20"
                : "bg-muted text-muted-foreground"
            }
          >
            {change}
          </Badge>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="h-20 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="value" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default PerformanceCard
