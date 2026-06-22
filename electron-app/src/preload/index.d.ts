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
      settings: {
        get: () => Promise<import('../shared/types/settings').Settings>
        set: (settings: import('../shared/types/settings').Settings) => void
        onChange: (
          callback: (settings: import('../shared/types/settings').Settings) => void
        ) => () => void
      },
      metrics: {
        subscribe: () => void
        unsubscribe: () => void
        onUpdate: (
          callback: (data: import('../shared/types/hardware').HardwareMetrics) => void
        ) => () => void
        onStatus: (callback: (status: string) => void) => () => void
      }
    }
  }
}
