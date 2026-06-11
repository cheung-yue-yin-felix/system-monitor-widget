import { useTranslation } from 'react-i18next';
import type React from 'react';
import type { RamMetrics } from '../../../types/hardware';

interface RamCardProps {
  ram: RamMetrics;
}

export default function RamCard({ ram }: RamCardProps): React.JSX.Element {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();

  return (
    <>
      <li>
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
            <img src={'./hardware_icons/ram.png'} alt="ram-icon" />
          </div>
          <div style={{ gridColumn: '1/3' }}>{t('labels.ram')}</div>
          <div>{t('labels.usedMemory')}</div>
          <div>{ram.usedMemory}</div>
          <div>{t('labels.availableMemory')}</div>
          <div>{ram.availableMemory}</div>
          <div>{t('labels.totalMemory')}</div>
          <div>{ram.totalMemory}</div>
        </div>
      </li>
      {ram.modules?.map((module, index) => (
        <li key={index}>
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
              overflowWrap: 'break-word',
            } as React.CSSProperties}
          >
            <div className="hardware-icon">
              <img src={'./hardware_icons/ram.png'} alt="ram-icon" />
            </div>
            <div style={{ gridColumn: '1/3' }}>{`${t('labels.module')} #${index}`}</div>
            <div>{t('labels.moduleName')}</div>
            <div>{module.name}</div>
            <div>{t('labels.moduleSize')}</div>
            <div>{module.size}</div>
            <div>{t('labels.type')}</div>
            <div>{module.type}</div>
            <div>{t('labels.formFactor')}</div>
            <div>{module.formFactor}</div>
          </div>
        </li>
      ))}
    </>
  );
}
