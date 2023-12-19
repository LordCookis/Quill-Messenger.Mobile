export const inputFilter = (value: string) => {
  const filteredValue = value.replace(/[\u0400-\u04FF\s!@#$%^&*()-+=?:;№"']/g, "").toLocaleLowerCase()
  return filteredValue
}