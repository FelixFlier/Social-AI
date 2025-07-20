import { create } from 'zustand'

interface SettingsState {
  // Social Integrations
  connectedPlatforms: any[]

  // AI Settings
  brandVoice: 'professional' | 'casual' | 'playful' | 'educational'
  customInstructions: string
  contentPreferences: {
    useEmojis: boolean
    suggestHashtags: boolean
    includeCTA: boolean
  }

  // Team
  teamMembers: any[]

  // Billing
  currentPlan: any
  usage: any
  billingHistory: any[]

  // Actions
  updateBrandVoice: (voice: 'professional' | 'casual' | 'playful' | 'educational') => void
  updateContentPreferences: (prefs: any) => void
  connectPlatform: (platform: any, credentials: any) => Promise<void>
  disconnectPlatform: (platformId: any) => Promise<void>
  inviteTeamMember: (email: string, role: string) => Promise<void>
  setCustomInstructions: (instructions: string) => void
  setUseEmojis: (value: boolean) => void
  setSuggestHashtags: (value: boolean) => void
  setIncludeCTA: (value: boolean) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  connectedPlatforms: [],
  brandVoice: 'professional',
  customInstructions: '',
  contentPreferences: {
    useEmojis: true,
    suggestHashtags: true,
    includeCTA: true
  },
  teamMembers: [],
  currentPlan: null,
  usage: null,
  billingHistory: [],
  updateBrandVoice: (voice) => set({ brandVoice: voice }),
  updateContentPreferences: (prefs) => set(state => ({ contentPreferences: { ...state.contentPreferences, ...prefs } })),
  connectPlatform: async (platform, credentials) => {
    // API call to connect platform
  },
  disconnectPlatform: async (platformId) => {
    // API call to disconnect
  },
  inviteTeamMember: async (email, role) => {
    // Send invitation
  },
  setCustomInstructions: (instructions) => set({ customInstructions: instructions }),
  setUseEmojis: (value) => set(state => ({ contentPreferences: { ...state.contentPreferences, useEmojis: value } })),
  setSuggestHashtags: (value) => set(state => ({ contentPreferences: { ...state.contentPreferences, suggestHashtags: value } })),
  setIncludeCTA: (value) => set(state => ({ contentPreferences: { ...state.contentPreferences, includeCTA: value } })),
}))
