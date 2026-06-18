import type { CurrentWeatherResponse, WeatherForecastData } from '../../../shared/types/weather'

interface CurrentWeatherResult {
  icon: string
  temperature: { place: string; value: string; unit: string }
  rainfall: { place: string; max: string; unit: string }
  humidity: { value: string }
  warningMessage: string
}

export const fetchCurrentWeather = async (
  language: string,
  district: string,
  tempStation: string
): Promise<CurrentWeatherResult> => {
  try {
    const data = (await window.api.weather.getCurrent(language)) as CurrentWeatherResponse

    const { icon, temperature, rainfall, humidity, warningMessage } = data

    return {
      icon: icon[0],
      temperature: temperature.data.filter((d) => d.place === tempStation)[0],
      rainfall: rainfall.data.filter((d) => d.place === district)[0],
      humidity: humidity.data[0],
      warningMessage
    }
  } catch (error) {
    console.error('Weather API error:', error instanceof Error ? error.message : String(error))
    throw error
  }
}

export const fetchForecastWeather = async (language: string): Promise<WeatherForecastData> => {
  try {
    return (await window.api.weather.getForecast(language)) as WeatherForecastData
  } catch (error) {
    console.error('Weather API error:', error instanceof Error ? error.message : String(error))
    throw error
  }
}
