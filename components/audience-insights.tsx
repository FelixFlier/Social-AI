"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Clock, Smartphone } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"

const ageData = [
  { name: "18-24", value: 15, color: "#6366f1" },
  { name: "25-34", value: 35, color: "#8b5cf6" },
  { name: "35-44", value: 28, color: "#06b6d4" },
  { name: "45-54", value: 15, color: "#10b981" },
  { name: "55+", value: 7, color: "#f59e0b" },
]

const genderData = [
  { name: "Female", value: 52, color: "#ec4899" },
  { name: "Male", value: 45, color: "#3b82f6" },
  { name: "Other", value: 3, color: "#6b7280" },
]

const locationData = [
  { country: "United States", percentage: 45 },
  { country: "United Kingdom", percentage: 18 },
  { country: "Canada", percentage: 12 },
  { country: "Germany", percentage: 10 },
  { country: "Australia", percentage: 8 },
  { country: "Others", percentage: 7 },
]

const deviceData = [
  { device: "Mobile", percentage: 78, color: "#6366f1" },
  { device: "Desktop", percentage: 18, color: "#8b5cf6" },
  { device: "Tablet", percentage: 4, color: "#06b6d4" },
]

const postingTimes = [
  { hour: "6 AM", mon: 20, tue: 25, wed: 30, thu: 35, fri: 40, sat: 15, sun: 10 },
  { hour: "9 AM", mon: 45, tue: 50, wed: 55, thu: 60, fri: 65, sat: 25, sun: 20 },
  { hour: "12 PM", mon: 70, tue: 75, wed: 80, thu: 85, fri: 90, sat: 40, sun: 35 },
  { hour: "3 PM", mon: 85, tue: 90, wed: 95, thu: 100, fri: 95, sat: 50, sun: 45 },
  { hour: "6 PM", mon: 60, tue: 65, wed: 70, thu: 75, fri: 80, sat: 60, sun: 55 },
  { hour: "9 PM", mon: 40, tue: 45, wed: 50, thu: 55, fri: 60, sat: 70, sun: 65 },
]

export function AudienceInsights() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Audience Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Demographics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Age Distribution
            </h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {ageData.map((item) => (
                <div key={item.name} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3">Gender Split</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {genderData.map((item) => (
                <div key={item.name} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Top Locations
          </h4>
          <div className="space-y-2">
            {locationData.map((location, index) => (
              <div key={location.country} className="flex items-center justify-between">
                <span className="text-sm">{location.country}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${location.percentage}%` }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{location.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Usage */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Device Usage
          </h4>
          <div className="space-y-2">
            {deviceData.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <span className="text-sm">{device.device}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${device.percentage}%`, backgroundColor: device.color }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{device.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Posting Times Heatmap */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Best Posting Times
          </h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postingTimes}>
                <XAxis dataKey="hour" fontSize={10} />
                <YAxis fontSize={10} />
                <Bar dataKey="tue" fill="#6366f1" radius={2} />
                <Bar dataKey="wed" fill="#8b5cf6" radius={2} />
                <Bar dataKey="thu" fill="#06b6d4" radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Peak engagement: Tuesday-Thursday, 2-4 PM</p>
        </div>
      </CardContent>
    </Card>
  )
}
