import { useSettings } from '../../../hooks/useSettings'
import { useWeather } from '../hooks'
import { useTranslation } from 'react-i18next'
import Loading from '../../../components/Loading'
import ErrorMessage from '../../../components/ErrorMessage'
import React, { useMemo } from 'react'

export default function WeatherWidget(): React.JSX.Element {
  const dpr = window.devicePixelRatio
  const { t } = useTranslation()
  const settings = useSettings()
  const { language, district, tempStation } = settings

  const translatedDistrict = useMemo(() => t(`districts.${district}`), [t, district])
  const translatedTempStation = useMemo(() => t(`stations.${tempStation}`), [t, tempStation])

  const { weather, loading, error } = useWeather(language, district, tempStation)

  const iconUrl = useMemo(
    () => (weather?.icon != null ? `./weather_icons/pic${weather.icon}.png` : null),
    [weather]
  )

  const cardStyle = useMemo(
    () =>
      ({
        '--dpr': dpr,
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: '0px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '24px'
      }) as React.CSSProperties,
    [dpr]
  )

  if (loading) return <Loading />

  if (error) return <ErrorMessage error={error} />

  return (
    <div className="card" style={cardStyle}>
      <div style={{ gridColumn: '1 / 4', fontSize: '18px' }}>
        {translatedTempStation}, {translatedDistrict}
      </div>
      <div style={{ gridColumn: '1 / 4' }}>
        <img
          src={iconUrl ?? undefined}
          alt="current-weather-icon"
          className="current-weather-icon"
        />
      </div>
      <div>{`${weather?.rainfall?.max} ${weather?.rainfall?.unit}`}</div>
      <div>{`${weather?.temperature?.value}°${weather?.temperature?.unit}`}</div>
      <div>{`${weather?.humidity?.value}%`}</div>
    </div>
  )
}
