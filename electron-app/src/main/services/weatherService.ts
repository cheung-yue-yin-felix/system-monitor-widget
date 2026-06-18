import {
  WEATHER_API_BASE_URL,
  WEATHER_API_HEADERS,
  WEATHER_DATA_TYPE
} from '../../shared/config/weather'
import type { CurrentWeatherResponse, WeatherForecastData } from '../../shared/types/weather'

const ONE_HOUR_MS = 60 * 60 * 1000

interface CacheEntry<T> {
  data: T
  fetchedAt: number
}

type CacheKey = `${typeof WEATHER_DATA_TYPE.current | typeof WEATHER_DATA_TYPE.forecast}-${string}`

const cache = new Map<CacheKey, CacheEntry<CurrentWeatherResponse | WeatherForecastData>>()

async function fetchFromApi<T>(dataType: string, language: string): Promise<T> {
  const url = new URL(`${WEATHER_API_BASE_URL}/weather.php`)
  url.searchParams.append('dataType', dataType)
  url.searchParams.append('lang', language)

  const response = await fetch(url.toString(), {
    headers: WEATHER_API_HEADERS
  })

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

function getCachedOrFetch<T extends CurrentWeatherResponse | WeatherForecastData>(
  dataType: typeof WEATHER_DATA_TYPE.current | typeof WEATHER_DATA_TYPE.forecast,
  language: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const key: CacheKey = `${dataType}-${language}`
  const entry = cache.get(key)

  if (entry && Date.now() - entry.fetchedAt < ONE_HOUR_MS) {
    return Promise.resolve(entry.data as T)
  }

  return fetcher().then((data) => {
    cache.set(key, { data, fetchedAt: Date.now() })
    return data
  })
}

export function getCurrentWeather(language: string): Promise<CurrentWeatherResponse> {
  return getCachedOrFetch(WEATHER_DATA_TYPE.current, language, () =>
    fetchFromApi<CurrentWeatherResponse>(WEATHER_DATA_TYPE.current, language)
  )
}

export function getForecastWeather(language: string): Promise<WeatherForecastData> {
  return getCachedOrFetch(WEATHER_DATA_TYPE.forecast, language, () =>
    fetchFromApi<WeatherForecastData>(WEATHER_DATA_TYPE.forecast, language)
  )
}

export function clearWeatherCache(): void {
  cache.clear()
}
