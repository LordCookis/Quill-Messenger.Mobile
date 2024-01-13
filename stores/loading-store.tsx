import { create } from 'zustand'

export const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (data: boolean) => set(() => ({ loading: data })),
}))