import SettingItem from './SettingItem'
import { useSettingsPanel } from '../hooks/useSettingsPanel'
import { useCallback } from 'react'
import type { Language } from '../../../types/settings'

export default function SettingsPanel(): React.JSX.Element {
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
    languageOptions,
    dateFormatOptions,
    timeFormatOptions,
    weekDayFormatOptions,
    districts,
    tempStations,
    labels
  } = useSettingsPanel()

  const handleLanguageChange = useCallback(
    (value: string) => setLanguage(value as Language),
    [setLanguage]
  )
  const handleDateFormatChange = useCallback(
    (format: string) => setDateFormat(format),
    [setDateFormat]
  )

  const handleTimeFormatChange = useCallback(
    (format: string) => setTimeFormat(format),
    [setTimeFormat]
  )

  const handleWeekDayChange = useCallback(
    (format: string) => setWeekDayFormat(format),
    [setWeekDayFormat]
  )

  const handleDistrictChange = useCallback(
    (district: string) => setDistrict(district),
    [setDistrict]
  )

  const handleTempStationChange = useCallback(
    (station: string) => setTempStation(station),
    [setTempStation]
  )

  return (
    <div
      className="settings-panel"
      style={{
        padding: '10px 14px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      }}
    >
      <SettingItem
        label={labels.language}
        value={language}
        options={languageOptions}
        onChange={handleLanguageChange}
      />
      <SettingItem
        label={labels.dateFormat}
        value={dateFormat}
        options={dateFormatOptions}
        onChange={handleDateFormatChange}
      />
      <SettingItem
        label={labels.timeFormat}
        value={timeFormat}
        options={timeFormatOptions}
        onChange={handleTimeFormatChange}
      />
      <SettingItem
        label={labels.weekDayFormat}
        value={weekDayFormat}
        options={weekDayFormatOptions}
        onChange={handleWeekDayChange}
      />
      <SettingItem
        label={labels.district}
        value={district}
        options={districts}
        onChange={handleDistrictChange}
      />
      <SettingItem
        label={labels.tempStation}
        value={tempStation}
        options={tempStations}
        onChange={handleTempStationChange}
      />
    </div>
  )
}
