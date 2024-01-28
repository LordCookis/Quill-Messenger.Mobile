export type userData = {
  avatar: string,
  displayedName: string,
  usertag: string,
  _id: string
}

export type chat = {
  _id: string,
  members: string[],
  createdAt: string,
  updatedAt: string,
  inputMessage: string,
  isTyping: boolean,
  lastMessage: string,
}