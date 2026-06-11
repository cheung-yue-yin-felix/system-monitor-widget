import { useTranslation } from 'react-i18next';
import type React from 'react';
import type { CpuMetrics } from '../../../types/hardware';

interface CpuCardProps {
  cpu: CpuMetrics;
}

export default function CpuCard({ cpu }: CpuCardProps): React.JSX.Element {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();

  return (
    <div
      className="card"
      style={{
        '--dpr': dpr,
        display: 'grid',
        gridTemplateColumns: '100px 150px',
        gap: '0px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '18px',
      } as React.CSSProperties}
    >
      <div className="hardware-icon">
        <img src={'./hardware_icons/cpu.png'} alt="cpu-icon" />
      </div>
      <div
        style={{
          gridColumn: '1 / 3',
        }}
      >
        {cpu.name}
      </div>
      <div>{t('labels.clockMHz')}</div>
      <div>{cpu.clockSpeed}</div>
      <div>{t('labels.usagePercent')}</div>
      <div>{cpu.load}</div>
      <div>{t('labels.temperatureC')}</div>
      <div>{cpu.temperature}</div>
      <div>{t('labels.powerW')}</div>
      <div>{cpu.power}</div>
    </div>
  );
}
