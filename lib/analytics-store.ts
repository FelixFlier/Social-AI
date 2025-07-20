import { create } from 'zustand'
import { subDays } from 'date-fns'

interface AnalyticsState {
  dateRange: { from: Date, to: Date }
  metrics: any
  topPosts: any[]
  platformData: any[]
  isLoading: boolean
  fetchAnalytics: () => Promise<void>
  exportReport: (format: 'pdf' | 'csv') => Promise<void>
  setDateRange: (dateRange: { from: Date, to: Date }) => void
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  dateRange: { from: subDays(new Date(), 30), to: new Date() },
  metrics: null,
  topPosts: [],
  platformData: [],
  isLoading: false,
  fetchAnalytics: async () => {
    set({ isLoading: true })
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({
      metrics: {},
      topPosts: [],
      platformData: [],
      isLoading: false
    })
  },
  exportReport: async (format: 'pdf' | 'csv') => {
    console.log(`Exporting report as ${format}`)
  },
  setDateRange: (dateRange) => set({ dateRange }),
}))
