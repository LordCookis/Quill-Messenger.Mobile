import { fetchUserByIdAPI, fetchUserByTagAPI } from '../api/user-api'
import { userData } from '../types/types'
import { netRequestHandler } from '../utils/net-request-handler'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface counterStore {
  userCache: {[key: string]: userData}
  addUserCache: (senderID: string) => void
  removeUserCache: () => void
}

export const useUserCache = create<counterStore>()(persist((set) => ({
  userCache: {},
  addUserCache: async (data) => {
    const user = await netRequestHandler(()=>fetchUserByIdAPI(data))
    set((state)=>({userCache: {...state.userCache, [data]: {...user.data, avatar: {format: 'png', code: user?.data?.avatar?.code}}}}))
  },
  removeUserCache: () => set({userCache: {}})
}),{
  name: "message-counters"
}))