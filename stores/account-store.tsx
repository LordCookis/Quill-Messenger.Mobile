import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface userData {
  _id: string,
  usertag: string,
  avatar: string,
  displayedName: string,
  lastOnline: string,
}

type AccoutStore = {
  _id: string,
  usertag: string,
  avatar: string,
  displayedName: string,
  lastOnline: string,
  setUser: (arg0: userData) => void
}

export const useAccountStore = create<AccoutStore>()(persist((set) => ({
  _id: "",
  avatar: "",
  usertag: "",
  displayedName: "",
  lastOnline: "",
  setUser: (userdata: userData) => set(() => ({
    _id: userdata._id,
    usertag: userdata.usertag,
    avatar: userdata.avatar,
    displayedName: userdata.displayedName,
    lastOnline: userdata.lastOnline,
  })),
  clearAccountStore: () => set(()=>({
    _id: "",
    usertag: "",
    avatar: "",
    displayedName: "",
    lastOnline: ""
  }))
}),{
  name: "userAccount",
  storage: createJSONStorage(() => AsyncStorage),
}))