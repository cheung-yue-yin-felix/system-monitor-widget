import { useContext } from 'react';
import SettingsContext from '../context/settings-context';
import type { SettingsContextValue } from '../types/settings';

const STORAGE_KEY = 'system-monitor-settings';

export const DEFAULT_SETTINGS: SettingsContextValue = {
  language: 'en',
  dateFormat: 'MMM d',
  timeFormat: 'HH:mm',
  weekDayFormat: 'cccc',
  district: 'KT',
  tempStation: 'KTG',
  setLanguage: () => {},
  setDateFormat: () => {},
  setTimeFormat: () => {},
  setWeekDayFormat: () => {},
  setDistrict: () => {},
  setTempStation: () => {},
};

export function loadSettings(): Omit<SettingsContextValue,
  | 'setLanguage'
  | 'setDateFormat'
  | 'setTimeFormat'
  | 'setWeekDayFormat'
  | 'setDistrict'
  | 'setTempStation'
> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch (error) {
    console.error(error);
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: Record<string, unknown>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore write errors
  }
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
