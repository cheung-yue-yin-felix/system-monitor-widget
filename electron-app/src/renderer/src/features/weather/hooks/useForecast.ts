import { useEffect, useState } from 'react'
import { fetchForecastWeather } from '../../../api/weather'
import type { UseForecastResult } from '../../../types/weather'

export function useForecast(language: string): UseForecastResult {
  const [weather, setWeather] = useState<UseForecastResult['weather']>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isInitial = true

    const fetchWeatherData = async (): Promise<void> => {
      try {
        if (isInitial) {
          setLoading(true)
        }
        setError(null)

        const data = await fetchForecastWeather(language)
        setWeather(data as UseForecastResult['weather'])
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err : new Error('Failed to fetch weather data'))
      } finally {
        if (isInitial) {
          setLoading(false)
          isInitial = false
        }
      }
    }

    fetchWeatherData()
  }, [language])

  return { weather, loading, error }
}
