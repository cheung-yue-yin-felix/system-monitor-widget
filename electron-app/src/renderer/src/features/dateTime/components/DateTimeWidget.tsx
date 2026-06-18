import { useSettings } from '../../../hooks/useSettings'
import { useDateTime } from '../hooks'
import SecondsRing from './SecondsRing'
import type React from 'react'
import { useMemo } from 'react'
export default function DateTimeWidget(): React.JSX.Element {
  const settings = useSettings()
  const { weekDayYear, monthDate, timeStr, seconds } = useDateTime(settings)
  const dpr = window.devicePixelRatio

  const outerStyle = useMemo(
    () =>
      ({
        '--dpr': dpr,
        alignItems: 'center',
        fontFamily: '"Tektur", -apple-system, sans-serif',
        padding: 0
      }) as React.CSSProperties,
    [dpr]
  )

  const innerStyle = useMemo(
    () =>
      ({
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        paddingTop: '76px'
      }) as React.CSSProperties,
    []
  )

  return (
    <div className="card date-time-widget" style={outerStyle}>
      <SecondsRing seconds={seconds} />
      <div style={innerStyle}>
        <div style={{ fontSize: '24px' }}>{weekDayYear}</div>
        <div style={{ fontSize: '48px' }}>{monthDate}</div>
        <div style={{ fontSize: '48px' }}>{timeStr}</div>
      </div>
    </div>
  )
}
