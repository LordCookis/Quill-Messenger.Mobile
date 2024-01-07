import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  messagesHistory: {},
  setChatHistory: (data: any) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.ChatID]: [...data.messages]}
  })),
  addMessage: (data: any) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: [...(state.messagesHistory[data.chatID] || []), data]}
  }))
}))