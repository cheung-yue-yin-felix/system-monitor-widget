import { useSettings } from '../../../hooks/useSettings';
import { useWeather } from '../hooks';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import type React from 'react';

export default function WeatherWidget(): React.JSX.Element {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();
  const settings = useSettings();
  const { language, district, tempStation } = settings;

  const translatedDistrict = t(`districts.${district}`);
  const translatedTempStation = t(`stations.${tempStation}`);

  const { weather, loading, error } = useWeather(language, district, tempStation);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  const iconUrl = weather?.icon != null ? `./weather_icons/pic${weather.icon}.png` : null;

  return (
    <div
      className="card"
      style={{
        '--dpr': dpr,
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: '0px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '24px',
      } as React.CSSProperties}
    >
      <div
        style={{
          gridColumn: '1 / 4',
          fontSize: '18px',
        }}
      >
        {translatedTempStation}, {translatedDistrict}
      </div>
      <div
        style={{
          gridColumn: '1 / 4',
        }}
      >
        <img src={iconUrl ?? undefined} alt="current-weather-icon" className="current-weather-icon" />
      </div>
      <div>{`${weather?.rainfall?.max} ${weather?.rainfall?.unit}`}</div>
      <div>{`${weather?.temperature?.value}°${weather?.temperature?.unit}`}</div>
      <div>{`${weather?.humidity?.value}%`}</div>
    </div>
  );
}
