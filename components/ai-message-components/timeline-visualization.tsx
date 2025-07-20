"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface TimelineVisualizationProps {
  data: any[]
}

export function TimelineVisualization({ data }: TimelineVisualizationProps) {
  return (
    <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
