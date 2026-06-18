import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchCurrentWeather } from '../../../api/weather'
import type { WeatherData } from '../../../types/weather'

export function useWeather(
  language: string,
  district: string,
  tempStation: string
): { weather: WeatherData | null; loading: boolean; error: Error | null } {
  const { t } = useTranslation()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const translatedDistrict = useMemo(() => t(`districts.${district}`), [t, district])
  const translatedTempStation = useMemo(() => t(`stations.${tempStation}`), [t, tempStation])

  useEffect(() => {
    let isInitial = true

    const fetchWeatherData = async (): Promise<void> => {
      try {
        if (isInitial) {
          setLoading(true)
        }
        setError(null)

        const data = await fetchCurrentWeather(language, translatedDistrict, translatedTempStation)
        setWeather(data)
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
    const intervalId = setInterval(fetchWeatherData, 60 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [language, district, tempStation, translatedDistrict, translatedTempStation])

  return { weather, loading, error }
}
