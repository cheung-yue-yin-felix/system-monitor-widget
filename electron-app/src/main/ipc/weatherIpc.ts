import { ipcMain } from 'electron';
import { getCurrentWeather, getForecastWeather } from '../services/weatherService';

export function registerWeatherIpcHandlers(): void {
  ipcMain.handle('weather:getCurrent', async (_, language: string) => {
    return getCurrentWeather(language);
  });

  ipcMain.handle('weather:getForecast', async (_, language: string) => {
    return getForecastWeather(language);
  });
}
