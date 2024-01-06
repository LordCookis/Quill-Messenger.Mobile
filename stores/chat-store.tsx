import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useChatStore = create(persist((set) => ({
  userChats: [],
  activeChat: {},
  setUserChats: (data: any) => set((state: any) => ({ userChats: data })),
  addNewChat: (data: any) => set((state: any) => ({userChats: [data, ...state.userChats]})),
  clearChatStore: () => set(()=>({userChats: []})),
  setActiveChat: (data: any) => set((state: any) => ({activeChat: data}))
}),{
  name: "lastActiveChat",
  storage: createJSONStorage(() => AsyncStorage),
}))