import SettingItem from './SettingItem';
import { useSettingsPanel } from '../hooks/useSettingsPanel';

export default function SettingsPanel() {
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
    labels,
  } = useSettingsPanel();

  return (
    <div
      className="settings-panel"
      style={{
        padding: '10px 14px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <SettingItem
        label={labels.language}
        value={language}
        options={languageOptions}
        onChange={(value) => setLanguage(value as 'en' | 'tc' | 'sc')}
      />
      <SettingItem
        label={labels.dateFormat}
        value={dateFormat}
        options={dateFormatOptions}
        onChange={setDateFormat}
      />
      <SettingItem
        label={labels.timeFormat}
        value={timeFormat}
        options={timeFormatOptions}
        onChange={setTimeFormat}
      />
      <SettingItem
        label={labels.weekDayFormat}
        value={weekDayFormat}
        options={weekDayFormatOptions}
        onChange={setWeekDayFormat}
      />
      <SettingItem
        label={labels.district}
        value={district}
        options={districts}
        onChange={setDistrict}
      />
      <SettingItem
        label={labels.tempStation}
        value={tempStation}
        options={tempStations}
        onChange={setTempStation}
      />
    </div>
  );
}
