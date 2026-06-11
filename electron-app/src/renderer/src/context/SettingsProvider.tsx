import { useEffect, useState, useCallback, type ReactNode } from 'react';
import SettingsContext from './settings-context';
import { loadSettings, saveSettings } from '../hooks/useSettings';
import type { Language, SettingsContextValue } from '../types/settings';
import i18n from '../i18n';

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState(() => loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
    i18n.changeLanguage(settings.language);
  }, [settings.language]);

  const setLanguage = useCallback((language: Language) => {
    setSettings((prev) => ({ ...prev, language }));
  }, []);

  const setDateFormat = useCallback((format: string) => {
    setSettings((prev) => ({ ...prev, dateFormat: format }));
  }, []);

  const setTimeFormat = useCallback((format: string) => {
    setSettings((prev) => ({ ...prev, timeFormat: format }));
  }, []);

  const setWeekDayFormat = useCallback((format: string) => {
    setSettings((prev) => ({ ...prev, weekDayFormat: format }));
  }, []);

  const setDistrict = useCallback((district: string) => {
    setSettings((prev) => ({ ...prev, district }));
  }, []);

  const setTempStation = useCallback((station: string) => {
    setSettings((prev) => ({ ...prev, tempStation: station }));
  }, []);

  const value: SettingsContextValue = {
    language: settings.language,
    dateFormat: settings.dateFormat,
    timeFormat: settings.timeFormat,
    weekDayFormat: settings.weekDayFormat,
    district: settings.district,
    tempStation: settings.tempStation,
    setLanguage,
    setDateFormat,
    setTimeFormat,
    setWeekDayFormat,
    setDistrict,
    setTempStation,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
