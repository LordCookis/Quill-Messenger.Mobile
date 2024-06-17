type dateType = "full"|"fullshort"|"date"|"dateshort"|"day"|"count"|"time"

const monthsFull = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const monthsShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

export function calculateDate(timestamp: string, type: dateType){
  let date = new Date(timestamp)
  if(type === 'full')
    return `${date.getDate()}-${monthsFull[date.getMonth()]}-${date.getFullYear()} ${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`

  if(type === 'fullshort')
    return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()} ${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`

  if(type === 'date')
    return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()}`

  if(type === 'dateshort')
    return `${date.getDate()}-${[date.getMonth()+1]}-${date.getFullYear()}`

  if(type === 'day')
    return `${date.toLocaleDateString('ru-RU', {weekday: 'short'})}`

  if(type === 'time')
    return `${getHours(date)}:${getMinutes(date)}`

  let unaffectedDate = new Date(timestamp)

  if(type === 'count'){
    const today = new Date()
    let msInDay = 86400000;
    date.setHours(0,0,0,0);
    today.setHours(0,0,0,0)
    let diff = (+today - +date)/msInDay
    if(diff == 0)
      return `${getHours(unaffectedDate)}:${getMinutes(unaffectedDate)}`
    if(diff == 1)
      return 'Вчера'
    if(diff > 1 && diff <= 6)
      return `${date.toLocaleDateString('ru-RU', {weekday: 'short'})}`
    if(diff > 6)
      return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()-2000}`
  }

  return `${date.getDate()} - ${date.toLocaleDateString('ru-RU', {weekday: 'short'})} - ${date.getFullYear()} - ${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`
}

const getHours = (date: Date) => {
  return `${date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}`
}

const getMinutes = (date: Date) => {
  return `${date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}`
}

const getSeconds = (date: Date) => {
  return `${date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds()}`
}


export const isDifferentDay = (timestamp1: string, timestamp2: string) => {
  const fisrt = new Date(timestamp1)
  const second = new Date(timestamp2)
  let msInDay = 24 * 60 * 60 * 1000;
  let diff = Math.abs((+fisrt - +second)/msInDay)
  return diff > 1 ? true : false
}

export const differenceInMinutes = (timestamp1: string, timestamp2: string) => {
  const date1: any = new Date(timestamp1)
  const date2: any = new Date(timestamp2)
  let diff = date1 - date2
  return Math.abs(Math.floor((diff/1000)/60)) || 0;
}