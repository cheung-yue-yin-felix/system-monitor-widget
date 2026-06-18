export const WEATHER_API_BASE_URL = 'https://data.weather.gov.hk/weatherAPI/opendata'
export const WEATHER_API_HEADERS = { Accept: 'application/json' }

export const WEATHER_DATA_TYPE = {
  current: 'rhrread',
  forecast: 'fnd'
} as const
