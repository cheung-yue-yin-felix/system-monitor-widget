import { HONG_KONG_DISTRICTS } from '../constants/districts';
import { TEMP_STATIONS } from '../constants/tempStations';

export type Language = 'en' | 'tc' | 'sc';

export interface Settings {
  language: Language;
  dateFormat: string;
  timeFormat: string;
  weekDayFormat: string;
  district: string;
  tempStation: string;
}

export interface SettingsContextValue extends Settings {
  setLanguage: (language: Language) => void;
  setDateFormat: (format: string) => void;
  setTimeFormat: (format: string) => void;
  setWeekDayFormat: (format: string) => void;
  setDistrict: (district: string) => void;
  setTempStation: (station: string) => void;
}

export type District = typeof HONG_KONG_DISTRICTS[number];
export type TempStation = typeof TEMP_STATIONS[District][number];
