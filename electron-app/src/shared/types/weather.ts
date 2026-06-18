export interface CurrentWeatherResponse {
  icon: string[]
  temperature: { data: Array<{ place: string; value: string; unit: string }> }
  rainfall: { data: Array<{ place: string; max: string; unit: string }> }
  humidity: { data: Array<{ value: string }> }
  warningMessage: string
}

export interface ForecastWeatherItem {
  forecastDate: string
  ForecastIcon: number | string
  forecastMintemp: { value: string }
  forecastMaxtemp: { value: string }
  forecastMinrh: { value: string }
  forecastMaxrh: { value: string }
}

export interface WeatherForecastData {
  weatherForecast: ForecastWeatherItem[]
}
