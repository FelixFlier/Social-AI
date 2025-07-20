"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  AlertTriangle,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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
  addMonths,
  subMonths,
} from "date-fns"
import { useCalendarStore } from "./use-calendar-store"
import { useCalendarDragDrop } from "./use-calendar-drag-drop"
import { MonthView } from "./month-view"


export function CalendarPage() {
  const {
    view,
    setView,
    currentDate,
    goToPrevious,
    goToToday,
    goToNext,
    updatePostSchedule,
  } = useCalendarStore()

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    showConflictDialog,
    setShowConflictDialog,
    conflictData,
  } = useCalendarDragDrop({ updatePostSchedule })

  const forceSchedule = () => {
    // a real implementation would do something here
    setShowConflictDialog(false)
  }
  const rescheduleConflicts = () => {
    // a real implementation would do something here
    setShowConflictDialog(false)
  }
  const suggestOptimalTime = () => {
    // a real implementation would do something here
    setShowConflictDialog(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-600">Plan and schedule your social media content</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border p-1">
            <Button
              variant={view === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button
              variant={view === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('day')}
            >
              Day
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>
      {view === 'month' && (
        <MonthView
          currentDate={currentDate}
          scheduledPosts={[]}
          onPostClick={(post) => console.log(post)}
          onDateClick={(date) => console.log(date)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      )}

      <Dialog open={showConflictDialog} onOpenChange={setShowConflictDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scheduling Conflict Detected</DialogTitle>
            <DialogDescription>
              There are other posts scheduled around this time that might affect performance.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Conflicts Found:</h4>
              <ul className="space-y-2">
                {conflictData?.conflicts.map(conflict => (
                  <li key={conflict.id} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>{conflict.title} - {format(new Date(conflict.scheduledDate), 'PPp')}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Suggested Solutions:</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={suggestOptimalTime}>
                  <Clock className="h-4 w-4 mr-2" />
                  Suggest Optimal Time (AI-powered)
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={forceSchedule}>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Schedule Anyway
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={rescheduleConflicts}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reschedule Conflicting Posts
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConflictDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
