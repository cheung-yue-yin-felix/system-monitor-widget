import { useEffect, useMemo } from 'react';
import { useSettings } from '../../../hooks/useSettings';
import { useTranslation } from 'react-i18next';
import { HONG_KONG_DISTRICTS, TEMP_STATIONS } from '../../../constants';
import type { Option } from '../components/SettingItem';
import type { SettingsContextValue } from '../../../types/settings';

interface UseSettingsPanelReturn extends SettingsContextValue {
  languageOptions: Option[];
  dateFormatOptions: Option[];
  timeFormatOptions: Option[];
  weekDayFormatOptions: Option[];
  districts: Option[];
  tempStations: Option[];
  labels: {
    language: string;
    dateFormat: string;
    timeFormat: string;
    weekDayFormat: string;
    district: string;
    tempStation: string;
  };
}

export function useSettingsPanel(): UseSettingsPanelReturn {
  const { t } = useTranslation();
  const settings = useSettings();

  const {
    language,
    dateFormat,
    timeFormat,
    weekDayFormat,
    district,
    tempStation,
    setLanguage,
    setDateFormat,
    setTimeFormat,
    setWeekDayFormat,
    setDistrict,
    setTempStation,
  } = settings;

  const languageOptions = useMemo<Option[]>(
    () => [
      { value: 'en', label: t('labels.en') },
      { value: 'tc', label: t('labels.tc') },
      { value: 'sc', label: t('labels.sc') },
    ],
    [t]
  );

  const dateFormatOptions = useMemo<Option[]>(
    () => [
      { value: 'MMM do', label: t('labels.options.MMM do') },
      { value: 'MMM d', label: t('labels.options.MMM d') },
    ],
    [t]
  );

  const timeFormatOptions = useMemo<Option[]>(
    () => [
      { value: 'HH:mm', label: t('labels.options.HH-mm') },
      { value: 'hh:mm', label: t('labels.options.hh-mm') },
      { value: 'hh:mm a', label: t('labels.options.hh-mm-a') },
    ],
    [t]
  );

  const weekDayFormatOptions = useMemo<Option[]>(
    () => [
      { value: 'ccc', label: t('labels.options.ccc') },
      { value: 'cccc', label: t('labels.options.cccc') },
      { value: 'ccccc', label: t('labels.options.ccccc') },
    ],
    [t]
  );

  const districts = useMemo<Option[]>(
    () => HONG_KONG_DISTRICTS.map((d) => ({ value: d, label: t(`districts.${d}`) })),
    [t]
  );

  const tempStations = useMemo<Option[]>(() => {
    const stations = TEMP_STATIONS[district as keyof typeof TEMP_STATIONS];
    if (stations) {
      return stations.map((s) => ({ value: s, label: t(`stations.${s}`) }));
    }
    return [];
  }, [district, t]);

  useEffect(() => {
    if (
      tempStations.length > 0 &&
      !tempStations.some((s) => s.value === tempStation)
    ) {
      setTempStation(tempStations[0].value);
    }
  }, [tempStations, tempStation, setTempStation]);

  return {
    language,
    dateFormat,
    timeFormat,
    weekDayFormat,
    district,
    tempStation,
    setLanguage,
    setDateFormat,
    setTimeFormat,
    setWeekDayFormat,
    setDistrict,
    setTempStation,
    languageOptions,
    dateFormatOptions,
    timeFormatOptions,
    weekDayFormatOptions,
    districts,
    tempStations,
    labels: {
      language: t('labels.language'),
      dateFormat: t('labels.dateFormat'),
      timeFormat: t('labels.timeFormat'),
      weekDayFormat: t('labels.weekDayFormat'),
      district: t('labels.district'),
      tempStation: t('labels.tempStation'),
    },
  };
}
