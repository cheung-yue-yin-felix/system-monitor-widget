import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import type { Locale } from 'date-fns'

const localeLoaders = {
  en: () => import('date-fns/locale/en-GB'),
  tc: () => import('date-fns/locale/zh-HK'),
  sc: () => import('date-fns/locale/zh-CN')
} as const

interface UseDateTimeParams {
  language: string
  dateFormat: string
  timeFormat: string
  weekDayFormat: string
}

interface DateTimeResult {
  weekDayYear: string
  monthDate: string
  timeStr: string
  seconds: number
}

export function useDateTime({
  language,
  dateFormat,
  timeFormat,
  weekDayFormat
}: UseDateTimeParams): DateTimeResult {
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const [locale, setLocale] = useState<Locale | null>(null)

  useEffect(() => {
    let cancelled = false

    const loader = localeLoaders[language as keyof typeof localeLoaders]
    if (!loader) return

    loader().then((mod) => {
      if (!cancelled) setLocale(mod.default)
    })

    return () => {
      cancelled = true
    }
  }, [language])

  const formatOptions = locale ? { locale } : undefined

  return {
    weekDayYear: format(date, `${weekDayFormat} yyyy`, formatOptions),
    monthDate: format(date, dateFormat, formatOptions),
    timeStr: format(date, timeFormat, formatOptions),
    seconds: date.getSeconds()
  }
}
