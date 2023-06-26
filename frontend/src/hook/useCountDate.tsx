import { useState } from "react"

export function difDates(dateOne: Date, dateTwo: Date) {
  const dateOneGetTime= new Date(dateTwo).getTime()
  const dateTwoGetTime= new Date(dateOne).getTime()

  const interval = dateOneGetTime - dateTwoGetTime 

  const second = 1000
  const minute = second * 60
  const hour = minute * 60 
  const day = hour * 24 

  const dayNumber = Math.floor(interval / day)
  const hourNumber = Math.floor((interval % day) / hour)
  const minuteNumber = Math.floor((interval % hour) / minute)
  const secondNumber = Math.floor((interval % minute) / second)

  return [dayNumber,hourNumber,minuteNumber,secondNumber]
} 

export function useCountDate(date: Date){
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  const count = () => {
    const [dayNumber,hourNumber,minuteNumber,secondNumber] = difDates(date, new Date())

    setDay(dayNumber)
    setHour(hourNumber)
    setMinute(minuteNumber)
    setSecond(secondNumber)
    
  }

  setInterval(count, 1000)

  return [day,hour,minute,second]
}