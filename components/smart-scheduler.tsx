"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar as CalendarIcon } from 'lucide-react'

const bestTimes = [
  { platform: "Instagram", time: "2:00 PM", boost: "+23%" },
  { platform: "Facebook", time: "1:00 PM", boost: "+18%" },
  { platform: "LinkedIn", time: "9:00 AM", boost: "+31%" },
  { platform: "Twitter", time: "12:00 PM", boost: "+15%" },
]

interface SmartSchedulerProps {
  onSchedule: (date: Date) => void
}

const SmartScheduler = ({ onSchedule }: SmartSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("12:00")

  const handleSchedule = () => {
    if (date) {
      const [hours, minutes] = time.split(':').map(Number)
      const scheduledDate = new Date(date)
      scheduledDate.setHours(hours, minutes)
      onSchedule(scheduledDate)
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-medium text-gray-700">Date</Label>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mt-2"
            />
          </div>
          <div>
            <Label className="text-base font-medium text-gray-700">Time</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary mt-2"
            />
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-700 mb-3 block">
            <Clock className="h-4 w-4 inline mr-2" />
            Best Times (AI Recommended)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {bestTimes.map((time) => (
              <Badge
                key={time.platform}
                variant="outline"
                className="justify-between p-3 cursor-pointer hover:bg-success/10 hover:border-success transition-colors"
              >
                <span className="font-medium">{time.platform}</span>
                <span className="text-success font-semibold">
                  {time.time} {time.boost}
                </span>
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={handleSchedule} className="w-full">Schedule Post</Button>
      </CardContent>
    </Card>
  )
}

export default SmartScheduler
