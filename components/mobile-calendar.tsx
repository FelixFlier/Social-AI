"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

const MobileCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [view, setView] = useState('month')

    const handlers = useSwipeable({
      onSwipedLeft: () => navigateNext(),
      onSwipedRight: () => navigatePrevious(),
      trackMouse: false,
      trackTouch: true
    })

    const navigateNext = () => {
        if (view === 'month') {
            setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))
        }
    }

    const navigatePrevious = () => {
        if (view === 'month') {
            setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))
        }
    }

    const openQuickCreate = () => {
        //
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Calendar Header */}
        <div className="sticky top-0 bg-white border-b z-10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={navigatePrevious}><ChevronLeft className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={navigateNext}><ChevronRight className="h-5 w-5" /></Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['month', 'week', 'day'].map(viewOption => (
              <button
                key={viewOption}
                onClick={() => setView(viewOption)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                  view === viewOption
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600"
                )}
              >
                {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Swipeable Calendar Content */}
        <div {...handlers} className="p-4">
          {view === 'month' && <Calendar mode="single" selected={selectedDate} onSelect={(date) => setSelectedDate(date as Date)} className="w-full" />}
          {view === 'week' && <p>Week view</p>}
          {view === 'day' && <p>Day view</p>}
        </div>

        {/* Floating Action Button */}
        <motion.button
          className="fixed bottom-20 right-4 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center z-20"
          whileTap={{ scale: 0.9 }}
          onClick={() => openQuickCreate()}
        >
          <Plus className="h-6 w-6 text-white" />
        </motion.button>
      </div>
    )
  }

  export default MobileCalendar;
