import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type counter = {
  chatID: string
  counter: number
}

interface counterStore {
  counters: {[key: string]: counter}
  addCounter: (chatID: string) => void
  resetCounter: (chatID: string) => void
  removeCounters: () => void
  countersAmount: () => number
  decCounter: (chatID: string) => void
}

export const useCounterStore = create<counterStore>()(persist((set) => ({
  counters: {},
  addCounter: (chatID: string) => {
    console.log(chatID)
    set((state) => ({
    counters: {...state.counters, [chatID]: {chatID: chatID, counter: (state?.counters[chatID]?.counter ? state?.counters[chatID]?.counter : 0) + 1}}
  }))},
  resetCounter: (chatID: string) => {
    set((state) => ({
    counters: {...state.counters, [chatID]: {chatID: chatID, counter: 0}}
  }))},
  countersAmount: () => {
    const counted: number = Object.values(useCounterStore.getState().counters).reduce((acc: number, curr: counter) => curr.counter > 0 ? acc + 1 : acc, 0)
    return counted
  },
  decCounter: (chatID: string) => set((state) => ({
    counters: {...state.counters, [chatID]: {chatID: chatID, counter: state.counters[chatID].counter - 1}}
  })),
  removeCounters: () => set({counters: {}})
}),{
  name: "message-counters",
  storage: createJSONStorage(() => AsyncStorage),
}))