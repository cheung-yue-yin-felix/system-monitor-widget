import { WeatherCard } from '../features/weather'
import { useForecast } from '../features/weather/hooks'
import { useSettings } from '../hooks/useSettings'
import { parse } from 'date-fns'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import type React from 'react'
import { useMemo } from 'react'

export default function ForecastPanel(): React.JSX.Element {
  const settings = useSettings()
  const language = settings.language
  const { weather, loading, error } = useForecast(language)

  const forecastItems = useMemo(() => {
    return (
      weather?.weatherForecast?.map((item) => ({
        date: parse(item.forecastDate, 'yyyyMMdd', new Date()),
        iconUrl: item.ForecastIcon != null ? `./weather_icons/pic${item.ForecastIcon}.png` : null,
        minTemp: item.forecastMintemp.value,
        maxTemp: item.forecastMintemp.value,
        minHumid: item.forecastMinrh.value,
        maxHumid: item.forecastMaxrh.value
      })) ?? []
    )
  }, [weather])

  if (loading) {
    return (
      <li className="grid-span-all">
        <Loading />
      </li>
    )
  }

  if (error) {
    return (
      <li className="grid-span-all">
        <ErrorMessage error={error} />
      </li>
    )
  }

  return (
    <>
      {forecastItems.map((item) => (
        <li key={item.date.toISOString()}>
          <WeatherCard
            date={item.date}
            iconUrl={item.iconUrl}
            minTemp={item.minTemp}
            maxTemp={item.maxTemp}
            minHumid={item.minHumid}
            maxHumid={item.maxHumid}
          />
        </li>
      ))}
    </>
  )
}
