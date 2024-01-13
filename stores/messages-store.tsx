import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  messagesHistory: {},
  setChatHistory: (data: any) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID],
      'messages': [...data.messages],
      isTyping: false,
      inputMessage: ""
    }}
  })),
  addMessage: (data: any) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID], messages: [...(state.messagesHistory[data.chatID].messages || []), data]
    }}
  })),
  setIsTyping: (data: any) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID], isTyping: data.state
    }}
  })),
  setInputMessage: (data: any) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID], inputMessage: data.message
    }}
  }))
}))