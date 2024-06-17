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
  displayedName: string,
  host: string,
}

interface AccoutStore {
  _id: string,
  usertag: string,
  avatar: {
    format: string,
    code: string,
  },
  displayedName: string,
  host: string,
  connect: number,
  setUser: (data: userData) => void,
  clearAccountStore: () => void,
  setConnect: (info: number) => void,
  trigger: number,
  incTrigger: () => void
}

export const useAccountStore = create<AccoutStore>()(persist((set) => ({
  _id: "",
  avatar: {
    format: "",
    code: "",
  },
  usertag: "",
  displayedName: "",
  host: "",
  connect: 0,
  trigger: 0,
  incTrigger: () => set((state) => ({trigger: state.trigger + 1})),
  setUser: (userdata: userData) => set(() => ({
    _id: userdata._id,
    usertag: userdata.usertag,
    avatar: userdata.avatar,
    displayedName: userdata.displayedName,
    host: userdata.host,
  })),
  clearAccountStore: () => set(()=>({
    _id: "",
    usertag: "",
    avatar: {
      format: "",
      code: "",
    },
    displayedName: "",
    host: "",
  })),
  setConnect: (info: number) => set(()=>({connect: info})),
}),{
  name: "userAccount",
  storage: createJSONStorage(() => AsyncStorage),
}))