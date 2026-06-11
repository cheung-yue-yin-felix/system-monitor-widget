import createExternalApi from './external';
import { config } from '../configs/configs';

const BASE_URL = config.weatherApi.baseUrl;
const DEFAULT_HEADERS = config.weatherApi.defaultHeaders;
const CURRENT_WEATHER_DATA_TYPE = config.weatherApi.dataTypeKey.currentWeather;
const FORECAST_WEATHER_DATA_TYPE = config.weatherApi.dataTypeKey.forecastWeather;

const weatherApi = createExternalApi(BASE_URL, DEFAULT_HEADERS);

interface CurrentWeatherResponse {
  icon: string[];
  temperature: { data: Array<{ place: string; value: string; unit: string }> };
  rainfall: { data: Array<{ place: string; max: string; unit: string }> };
  humidity: { data: Array<{ value: string }> };
  warningMessage: string;
}

export const fetchCurrentWeather = async (
  language: string,
  district: string,
  tempStation: string
) => {
  try {
    const data = (await weatherApi('/weather.php', {
      params: {
        dataType: CURRENT_WEATHER_DATA_TYPE,
        lang: language,
      },
    })) as CurrentWeatherResponse;

    const { icon, temperature, rainfall, humidity, warningMessage } = data;

    return {
      icon: icon[0],
      temperature: temperature.data.filter((d) => d.place === tempStation)[0],
      rainfall: rainfall.data.filter((d) => d.place === district)[0],
      humidity: humidity.data[0],
      warningMessage: warningMessage,
    };
  } catch (error) {
    console.error('Weather API error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};

export const fetchForecastWeather = async (language: string) => {
  try {
    return await weatherApi('/weather.php', {
      params: {
        dataType: FORECAST_WEATHER_DATA_TYPE,
        lang: language,
      },
    });
  } catch (error) {
    console.error('Weather API error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};
