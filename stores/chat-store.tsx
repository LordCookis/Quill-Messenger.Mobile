import { create } from 'zustand'

export const useChatStore = create((set) => ({
  userChats: [],
  activeChat: {},
  setUserChats: (data: any) => set((state: any) => ({ userChats: data })),
  addNewChat: (data: any) => set((state: any) => ({userChats: [data, ...state.userChats]})),
  clearChatStore: () => set(()=>({userChats: []})),
  setActiveChat: (data: any) => set((state: any) => ({activeChat: data}))
}))