type dateType = "full"|"fullshort"|"date"|"dateshort"|"day"|"count"|"time"

const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function calculateDate(locale: string, timestamp: string, type: dateType){
  let date = new Date(timestamp)
  if(type === 'full')
    return `${date.getDate()}-${monthsFull[date.getMonth()]}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  if(type === 'fullshort')
    return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  if(type === 'date')
    return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()}`

  if(type === 'dateshort')
    return `${date.getDate()}-${[date.getMonth()+1]}-${date.getFullYear()}`

  if(type === 'day')
    return `${date.toLocaleDateString(locale, {weekday: 'long'})}`

  if(type === 'time')
    return `${date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}`

  let unaffectedDate = new Date(timestamp)

  if(type === 'count'){
    const today = new Date()
    let msInDay = 24 * 60 * 60 * 1000;
    date.setHours(0,0,0,0);
    today.setHours(0,0,0,0)
    let diff = (+today - +date)/msInDay
    if(diff == 0)
      return `${unaffectedDate.getHours() < 10 ? "0" + unaffectedDate.getHours(): unaffectedDate.getHours()}:${unaffectedDate.getMinutes() < 10 ? "0" + unaffectedDate.getMinutes(): unaffectedDate.getMinutes()}`
    if(diff == 1)
      return 'Yesterday'
    if(diff > 1 && diff <= 6)
      return `${date.toLocaleDateString(locale, {weekday: 'long'})}`
    if(diff > 6 && diff <= 13)
      return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()}`
  }

  return `${date.getDate()} - ${date.toLocaleDateString(locale, {weekday: 'long'})} - ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const isDifferentDay = (timestamp1: string, timestamp2: string) => {
  const fisrt = new Date(timestamp1)
  const second = new Date(timestamp2)
  let msInDay = 24 * 60 * 60 * 1000;
  let diff = Math.abs((+fisrt - +second)/msInDay)
  return diff > 1 ? true : false
}