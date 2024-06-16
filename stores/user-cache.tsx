import { fetchUserByIdAPI, fetchUserByTagAPI } from '../api/user-api'
import { userData } from '../types/types'
import { netRequestHandler } from '../utils/net-request-handler'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface counterStore {
  userCache: {[key: string]: userData}
  addUserCache: (senderID: string, host:string) => void
  removeUserCache: () => void
}

export const useUserCache = create<counterStore>()(persist((set) => ({
  userCache: {},
  addUserCache: async (data, host) => {
    const user = await fetchUserByIdAPI(data, host)
    set((state)=>({userCache: {...state.userCache, [data]: {...user.data, avatar: {format: 'png', code: user?.data?.avatar?.code}}}}))
  },
  removeUserCache: () => set({userCache: {}})
}),{
  name: "message-counters",
  storage: createJSONStorage(() => AsyncStorage),
}))