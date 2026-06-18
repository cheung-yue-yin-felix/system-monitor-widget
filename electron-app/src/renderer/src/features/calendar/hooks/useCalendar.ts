import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { useMemo } from 'react'

const weekDaysMap = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  tc: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  sc: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
}

interface CalendarResult {
  days: Date[]
  weekdays: string[]
}

export function useCalendar(date: Date, language: string): CalendarResult {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days = useMemo(
    () => eachDayOfInterval({ start: startDate, end: endDate }),
    [startDate, endDate]
  )

  const weekdays = useMemo(() => weekDaysMap[language as keyof typeof weekDaysMap], [language])

  return { days, weekdays }
}
