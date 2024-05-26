import { create } from 'zustand'

export type message = {
  _id: string,
  chatID: string,
  senderID: string,
  type: string,
  text: string | { format: string; code: string } | { format: string; code: string, text: string },
  createdAt: string,
  updatedAt: string,
  __v: 0
}

export type messageHistory = {
  [key: string]: {
    messages: [message],
    isTyping: boolean,
    inputMessage: string
  }
}

interface messageStore {
  messagesHistory: messageHistory,
  addMessage: (data: message) => void,
  setChatHistory: (data: {chatID: string, messages: message[]}) => void,
  setIsTyping: (data: {chatID: string, state: boolean}) => void,
  setInputMessage: (data: {chatID: string, message: string}) => void,
}

export const useMessageStore = create<messageStore>()((set) => ({
  messagesHistory: {},
  setChatHistory: (data) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID],
      'messages': [...data.messages],
      isTyping: false,
      inputMessage: ""
    }}
  })),
  addMessage: (data) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID], messages: [...(state.messagesHistory[data.chatID].messages || []), data]
    }}
  })),
  setIsTyping: (data) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID], isTyping: data.state
    }}
  })),
  setInputMessage: (data) => set((state: any) => ({
    messagesHistory: {...state.messagesHistory, [data.chatID]: {
      ...state.messagesHistory[data.chatID], inputMessage: data.message
    }}
  }))
}))