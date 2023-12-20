import { create } from 'zustand'

export const useSocketStore = create((set) => ({
  socket: null,
  status: false,
  setSocket: (data: any) => set((state: any) => ({ socket: data })),
  setStatus: (data: any) => set((state: any) => ({ status: data }))
}))