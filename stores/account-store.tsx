import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type userData = {
  _id: string,
  usertag: string,
  avatar: {
    format: string,
    code: string,
  },
  format: string,
  displayedName: string,
}

interface AccoutStore {
  _id: string,
  usertag: string,
  avatar: {
    format: string,
    code: string,
  },
  displayedName: string,
  setUser: (data: userData) => void,
  clearAccountStore: () => void
}

export const useAccountStore = create<AccoutStore>()(persist((set) => ({
  _id: "",
  avatar: {
    format: "",
    code: "",
  },
  usertag: "",
  displayedName: "",
  setUser: (userdata: userData) => set(() => ({
    _id: userdata._id,
    usertag: userdata.usertag,
    avatar: userdata.avatar,
    format: userdata.format,
    displayedName: userdata.displayedName,
  })),
  clearAccountStore: () => set(()=>({
    _id: "",
    usertag: "",
    avatar: {
      format: "",
      code: "",
    },
    displayedName: "",
  }))
}),{
  name: "userAccount",
  storage: createJSONStorage(() => AsyncStorage),
}))