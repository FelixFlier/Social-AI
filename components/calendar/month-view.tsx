import * as React from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  format,
} from "date-fns"
import { cn } from "@/lib/utils"

import { PostCard } from "./post-card"

export const MonthView = ({
  currentDate,
  scheduledPosts,
  onPostClick,
  onDateClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  return (
    <div className="grid grid-cols-7 gap-1 bg-white rounded-lg border overflow-hidden">
      {/* Week Day Headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="p-4 text-center font-medium text-gray-500 bg-gray-50 border-b">
          {day}
        </div>
      ))}

      {/* Calendar Days */}
      {days.map(day => {
        const dayPosts = scheduledPosts.filter(post =>
          isSameDay(new Date(post.scheduledDate), day)
        )
        const isCurrentMonth = isSameMonth(day, currentDate)
        const isTodayFlag = isToday(day)

        return (
          <div
            key={day.toISOString()}
            className={cn(
              "min-h-[120px] p-2 border-b border-r cursor-pointer hover:bg-gray-50",
              !isCurrentMonth && "bg-gray-100 text-gray-400",
              isTodayFlag && "bg-blue-50"
            )}
            onClick={() => onDateClick(day)}
            onDragOver={(e) => onDragOver(e, day, null)}
            onDrop={(e) => onDrop(e, day, null)}
          >
            <div className={cn(
              "text-sm font-medium mb-2",
              isTodayFlag && "text-blue-600"
            )}>
              {format(day, 'd')}
            </div>

            <div className="space-y-1">
              {dayPosts.slice(0, 3).map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  compact={true}
                  onClick={() => onPostClick(post)}
                  onDragStart={(e) => onDragStart(e, post)}
                  onDragEnd={onDragEnd}
                />
              ))}

              {dayPosts.length > 3 && (
                <div className="text-xs text-gray-500 text-center py-1">
                  +{dayPosts.length - 3} more
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
