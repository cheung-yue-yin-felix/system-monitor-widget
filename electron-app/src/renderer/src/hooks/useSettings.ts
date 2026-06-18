import { useContext } from 'react'
import SettingsContext from '../context/settings-context'
import type { Settings, SettingsContextValue } from '../types/settings'

const STORAGE_KEY = 'system-monitor-settings'

const DEFAULT_SETTINGS_DATA: Settings = {
  language: 'en',
  dateFormat: 'MMM d',
  timeFormat: 'HH:mm',
  weekDayFormat: 'cccc',
  district: 'KT',
  tempStation: 'KTG'
}

export const DEFAULT_SETTINGS: SettingsContextValue = {
  ...DEFAULT_SETTINGS_DATA,
  setLanguage: () => {},
  setDateFormat: () => {},
  setTimeFormat: () => {},
  setWeekDayFormat: () => {},
  setDistrict: () => {},
  setTempStation: () => {}
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<Settings>) : {}
    return {
      ...DEFAULT_SETTINGS_DATA,
      ...parsed
    }
  } catch (error) {
    console.error(error)
    return { ...DEFAULT_SETTINGS_DATA }
  }
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore write errors
  }
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
