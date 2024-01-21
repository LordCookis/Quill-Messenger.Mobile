import { create } from 'zustand'

interface loadingStore {
  loading: boolean,
  setLoading: (data: boolean) => void 
}

export const useLoadingStore = create<loadingStore>()((set) => ({
  loading: false,
  setLoading: (data: boolean) => set(() => ({ loading: data })),
}))