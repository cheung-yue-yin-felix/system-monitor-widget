import { HONG_KONG_DISTRICTS } from '../constants/districts'
import { TEMP_STATIONS } from '../constants/tempStations'
import type { Language, Settings } from '../../../shared/types/settings'

export type { Language, Settings }

export interface SettingsContextValue extends Settings {
  setLanguage: (language: Language) => void
  setDateFormat: (format: string) => void
  setTimeFormat: (format: string) => void
  setWeekDayFormat: (format: string) => void
  setDistrict: (district: string) => void
  setTempStation: (station: string) => void
}

export type District = (typeof HONG_KONG_DISTRICTS)[number]
export type TempStation = (typeof TEMP_STATIONS)[District][number]
