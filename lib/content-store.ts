import { create } from 'zustand'

interface Post {
  id: string
  content: string
  media: any[]
  scheduledTime?: Date
  platforms: ('instagram' | 'linkedin' | 'facebook' | 'twitter')[]
}

interface ContentState {
  currentPost: Partial<Post>
  drafts: Post[]
  templates: any[]
  isGenerating: boolean
  updatePost: (updates: Partial<Post>) => void
  generateContent: (request: any) => Promise<void>
  saveDraft: () => void
}

export const useContentStore = create<ContentState>((set, get) => ({
  currentPost: {
    content: '',
    media: [],
    platforms: [],
  },
  drafts: [],
  templates: [],
  isGenerating: false,
  updatePost: (updates) => set((state) => ({
    currentPost: { ...state.currentPost, ...updates }
  })),
  generateContent: async (request) => {
    set({ isGenerating: true })
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    const generatedContent = "This is some AI generated content based on your prompt!"
    set(state => ({
      currentPost: { ...state.currentPost, content: generatedContent },
      isGenerating: false
    }))
  },
  saveDraft: () => {
    const currentPost = get().currentPost
    if (currentPost.content || currentPost.media?.length) {
      set(state => ({
        drafts: [...state.drafts, { ...currentPost, id: Date.now().toString() } as Post],
        currentPost: { content: '', media: [], platforms: [] }
      }))
    }
  }
}))
