import create from 'zustand';
import { addMonths, subMonths } from 'date-fns';

type CalendarView = 'month' | 'week' | 'day';

interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  scheduledPosts: any[]; // Replace 'any' with a proper type later
  selectedPost: any | null; // Replace 'any' with a proper type later
  isLoading: boolean;
  setView: (view: CalendarView) => void;
  setCurrentDate: (date: Date) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToToday: () => void;
  updatePostSchedule: (postId: string, newDate: Date, newTime: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  duplicatePost: (postId: string) => Promise<void>;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  view: 'month',
  scheduledPosts: [],
  selectedPost: null,
  isLoading: false,

  // Navigation
  setView: (view) => set({ view }),
  setCurrentDate: (date) => set({ currentDate: date }),
  goToNext: () =>
    set((state) => {
      const { currentDate, view } = state;
      if (view === 'month') {
        return { currentDate: addMonths(currentDate, 1) };
      }
      // Add week and day logic later
      return { currentDate: addMonths(currentDate, 1) };
    }),
  goToPrevious: () =>
    set((state) => {
        const { currentDate, view } = state;
        if (view === 'month') {
          return { currentDate: subMonths(currentDate, 1) };
        }
        // Add week and day logic later
        return { currentDate: subMonths(currentDate, 1) };
    }),
  goToToday: () => set({ currentDate: new Date() }),

  // Post Management
  updatePostSchedule: async (postId, newDate, newTime) => {
    set({ isLoading: true });
    // API call to update schedule
    console.log(`Updating post ${postId} to ${newDate} at ${newTime}`);
    // Update local state
    set({ isLoading: false });
  },

  deletePost: async (postId) => {
    console.log(`Deleting post ${postId}`);
  },

  duplicatePost: async (postId) => {
    console.log(`Duplicating post ${postId}`);
  },
}));
