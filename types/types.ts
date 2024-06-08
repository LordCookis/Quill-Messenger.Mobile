export type userData = {
  _id: string,
  usertag: string,
  avatar: {
    format: string,
    code: string,
  },
  displayedName: string,
  host: string,
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