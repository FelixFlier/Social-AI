import { create } from 'zustand'

interface ActivityItem {
  id: string
  type: 'post_published' | 'comment_received' | 'campaign_started' | 'ai_strategy_generated'
  title: string
  description: string
  timestamp: Date
  platform?: 'instagram' | 'linkedin' | 'facebook' | 'twitter'
  metrics?: { likes: number, comments: number, shares: number }
  status: 'success' | 'pending' | 'failed'
}

interface UpcomingPost {
  id: string
  platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter'
  content: string
  scheduledTime: Date
}

interface DashboardState {
  metrics: any
  activities: ActivityItem[]
  upcomingPosts: UpcomingPost[]
  isLoading: boolean
  refreshDashboard: () => void
  updateMetrics: (metrics: any) => void
  setActivities: (activities: ActivityItem[]) => void
  setUpcomingPosts: (posts: UpcomingPost[]) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: null,
  activities: [],
  upcomingPosts: [],
  isLoading: false,
  refreshDashboard: () => set({ isLoading: true }),
  updateMetrics: (metrics) => set({ metrics, isLoading: false }),
  setActivities: (activities) => set({ activities }),
  setUpcomingPosts: (posts) => set({ upcomingPosts: posts }),
}))
