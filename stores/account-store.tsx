import { create } from 'zustand'

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

export const useAccountStore = create<AccoutStore>()((set) => ({
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
}))