import CalendarGrid from './CalendarGrid'
import WeekDaysHeader from './WeekDaysHeader'
import { useSettings } from '../../../hooks/useSettings'
import { useCalendar } from '../hooks'
import type React from 'react'
import { useMemo } from 'react'

export default function CalendarWidget(): React.JSX.Element {
  const { language } = useSettings()
  const today = useMemo(() => new Date(), [])
  const { days, weekdays } = useCalendar(today, language)

  return (
    <div
      className="card"
      style={{
        width: '300px',
        height: '300px',
        padding: '28px'
      }}
    >
      {/* Weekday Headers */}
      <WeekDaysHeader weekdays={weekdays} language={language} />

      {/* Calendar Grid - Only current month days are shown */}
      <CalendarGrid today={today} days={days} />
    </div>
  )
}
