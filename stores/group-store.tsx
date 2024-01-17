import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useGroupStore = create(persist((set) => ({
  userGroups: [],
  activeGroup: {},
  setUserGroups: (data: any) => set((state: any) => ({ userGroups: data })),
  addNewGroup: (data: any) => set((state: any) => ({userGroups: [data, ...state.userGroups]})),
  clearGroupStore: () => set(()=>({userGroups: []})),
  setActiveGroup: (data: any) => set((state: any) => ({activeGroup: data}))
}),{
  name: "lastActiveGroup",
  storage: createJSONStorage(() => AsyncStorage),
}))