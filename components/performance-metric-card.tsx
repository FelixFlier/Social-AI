"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line } from "recharts"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface PerformanceMetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  data: number[]
  color: string
}

const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-500" />
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-500" />
  return <Minus className="h-4 w-4 text-gray-500" />
}

const PerformanceMetricCard = ({ title, value, change, trend, data, color }: PerformanceMetricCardProps) => {
  const chartData = data.map((v, i) => ({ name: i, value: v }))

  return (
    <Card className={`glass-card relative overflow-hidden group`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500 to-${color}-700 opacity-10 group-hover:opacity-20 transition-opacity`}/>
        <CardContent className="p-6 z-10">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <div className="flex items-center gap-1 text-sm font-semibold">
                    <TrendIcon trend={trend} />
                    <span>{change}</span>
                </div>
            </div>
            <motion.div
                className="text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {value}
            </motion.div>
            <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="value" stroke={`hsl(var(--${color}))`} strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}

export default PerformanceMetricCard
