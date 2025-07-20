"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { date: "Jan 1", instagram: 4000, facebook: 2400, linkedin: 2400, twitter: 1000 },
  { date: "Jan 2", instagram: 3000, facebook: 1398, linkedin: 2210, twitter: 2000 },
  { date: "Jan 3", instagram: 2000, facebook: 9800, linkedin: 2290, twitter: 1500 },
  { date: "Jan 4", instagram: 2780, facebook: 3908, linkedin: 2000, twitter: 1800 },
  { date: "Jan 5", instagram: 1890, facebook: 4800, linkedin: 2181, twitter: 1200 },
  { date: "Jan 6", instagram: 2390, facebook: 3800, linkedin: 2500, twitter: 1600 },
  { date: "Jan 7", instagram: 3490, facebook: 4300, linkedin: 2100, twitter: 1400 },
];

const PerformanceTimelineChart = () => {
    const [chartMetric, setChartMetric] = useState("reach")
    const [chartView, setChartView] = useState("daily")

    return (
        <Card className="glass-card mb-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                <CardTitle>Performance Timeline</CardTitle>
                <div className="flex items-center gap-2">
                    <Select value={chartMetric} onValueChange={setChartMetric}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reach">Reach</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                            <SelectItem value="clicks">Clicks</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={chartView} onValueChange={setChartView}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={3} />
                    <Line type="monotone" dataKey="linkedin" stroke="#0077B5" strokeWidth={3} />
                    <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={3} />
                    <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={3} />
                </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default PerformanceTimelineChart;
