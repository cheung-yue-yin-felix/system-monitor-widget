import { useSettings } from '../../../hooks/useSettings';
import { useDateTime } from '../hooks';
import SecondsRing from './SecondsRing';
import type React from 'react';

export default function DateTimeWidget(): React.JSX.Element {
  const settings = useSettings();
  const { weekDayYear, monthDate, timeStr, seconds } = useDateTime(settings);
  const dpr = window.devicePixelRatio;

  return (
    <div
      className="card date-time-widget"
      style={{
        '--dpr': dpr,
        alignItems: 'center',
        fontFamily: '"Tektur", -apple-system, sans-serif',
        padding: 0,
      } as React.CSSProperties}
    >
      {/* Seconds ring (animated border) */}
      <SecondsRing seconds={seconds} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          paddingTop: '76px',
        }}
      >
        <div style={{ fontSize: '24px' }}>{weekDayYear}</div>
        <div style={{ fontSize: '48px' }}>{monthDate}</div>
        <div style={{ fontSize: '48px' }}>{timeStr}</div>
      </div>
    </div>
  );
}
