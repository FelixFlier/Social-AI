"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, LineChart, Line } from "recharts"

const MobileDashboardCard = ({ stat, index }: { stat: any, index: number }) => {
  const chartData = stat.data.map((v: any, i: number) => ({ name: i, value: v }))
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 active:scale-95 transition-transform" // Active state für touch feedback
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
        </div>
        <Badge
          variant={stat.changeType === "positive" ? "default" : "secondary"}
          className="text-xs"
        >
          {stat.change}
        </Badge>
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        <p className="text-sm text-gray-500">{stat.title}</p>
      </div>

      {/* Mini Chart für Mobile */}
      <div className="mt-3 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={stat.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default MobileDashboardCard
