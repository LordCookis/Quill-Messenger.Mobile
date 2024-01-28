import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type chat = {
  _id: string,
  members: string[],
  createdAt: string,
  updatedAt: string,
  inputMessage: string,
  isTyping: boolean,
  lastMessage: string,
}

export type chatArray = {
  [key: string]: chat
}

export type friend = {
  avatar: string,
  displayedName: string,
  usertag: string,
  _id: string
}

interface chatStore {
  userChats: chatArray,
  activeChat: {chat: chat, friend: friend},
  setUserChats: (data: chatArray) => void,
  addNewChat: (data: chat) => void,
  setChatMessageTime: (data: {chatID: string, time: string}) => void,
  setIsTyping: (data: {chatID: string, state: boolean}) => void,
  setInputMessage: (data: {chatID: string, message: string}) => void,
  setActiveChat: (data: {chat: chat, friend: friend}) => void
  clearChatStore: () => void,
}

export const useChatStore = create<chatStore>()(persist((set) => ({
  userChats: {},
  activeChat: {},
  setUserChats: (data) => set((state: any) => ({ userChats: data })),
  addNewChat: (data) => set((state: any) => ({ userChats: {...state.userChats, [data._id]: {
    ...data,
    isTyping: false,
    lastMessage: ""
  }}})),
  setChatMessageTime: (data) => set((state: any) => ({ userChats: {...state.userChats, [data.chatID]: {
    ...state.userChats[data.chatID],
    lastMessage: data.time
  }}})),
  setIsTyping: (data) => set((state: any) => ({
    userChats: {...state.userChats, [data.chatID]: {
      ...state.userChats[data.chatID], isTyping: data.state
    }}
  })),
  setInputMessage: (data) => set((state: any) => ({
    userChats: {...state.userChats, [data.chatID]: {
      ...state.userChats[data.chatID], inputMessage: data.message
    }}
  })),
  setActiveChat: (data) => set((state: any) => ({activeChat: data})),
  clearChatStore: () => set(()=>({userChats: {}}))
}),{
  name: "lastActiveChat",
  storage: createJSONStorage(() => AsyncStorage),
}))