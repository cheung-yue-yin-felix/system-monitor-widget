import { WeatherForecastData } from '../../../shared/types/weather'

export interface WeatherData {
  icon?: string | null
  rainfall?: {
    max: string
    unit: string
  }
  temperature?: {
    value: string
    unit: string
  }
  humidity?: {
    value: string
  }
  // Add more fields as you expand (forecast, etc.)
}

export interface UseWeatherResult {
  weather: WeatherData | null
  loading: boolean
  error: Error | null
}

export interface UseForecastResult {
  weather: WeatherForecastData | null
  loading: boolean
  error: Error | null
}
