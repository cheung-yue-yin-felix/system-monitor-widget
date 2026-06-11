export interface WeatherData {
  icon?: string | null;
  rainfall?: {
    max: string;
    unit: string;
  };
  temperature?: {
    value: string;
    unit: string;
  };
  humidity?: {
    value: string;
  };
  // Add more fields as you expand (forecast, etc.)
}

export interface UseWeatherResult {
  weather: WeatherData | null;
  loading: boolean;
  error: Error | null;
}

export interface ForecastWeatherItem {
  forecastDate: string;
  ForecastIcon: number | string;
  forecastMintemp: { value: string };
  forecastMaxtemp: { value: string };
  forecastMinrh: { value: string };
  forecastMaxrh: { value: string };
}

export interface WeatherForecastData {
  weatherForecast: ForecastWeatherItem[];
}

export interface UseForecastResult {
  weather: WeatherForecastData | null;
  loading: boolean;
  error: Error | null;
}
