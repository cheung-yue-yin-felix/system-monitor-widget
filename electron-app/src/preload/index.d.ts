import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      weather: {
        getCurrent: (
          language: string
        ) => Promise<import('../shared/types/weather').CurrentWeatherResponse>
        getForecast: (
          language: string
        ) => Promise<import('../shared/types/weather').WeatherForecastData>
      }
    }
  }
}
