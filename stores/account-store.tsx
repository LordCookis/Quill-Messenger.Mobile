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
}

interface AccoutStore {
  _id: string,
  usertag: string,
  avatar: {
    format: string,
    code: string,
  },
  displayedName: string,
  connect: number,
  setUser: (data: userData) => void,
  clearAccountStore: () => void,
  setConnect: (info: number) => void,
}

export const useAccountStore = create<AccoutStore>()(persist((set) => ({
  _id: "",
  avatar: {
    format: "",
    code: "",
  },
  usertag: "",
  displayedName: "",
  connect: 0,
  setUser: (userdata: userData) => set(() => ({
    _id: userdata._id,
    usertag: userdata.usertag,
    avatar: userdata.avatar,
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
  })),
  setConnect: (info: number) => set(()=>({connect: info})),
}),{
  name: "userAccount",
  storage: createJSONStorage(() => AsyncStorage),
}))