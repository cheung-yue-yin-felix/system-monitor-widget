import { useTranslation } from 'react-i18next';
import type React from 'react';
import type { DiskMetrics } from '../../../types/hardware';

interface DiskCardProps {
  disk: DiskMetrics;
}

export default function DiskCard({ disk }: DiskCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const dpr = window.devicePixelRatio;

  return (
    <>
      {disk.partitions.map((partition, pIndex) =>
        partition.volumes.map((volume) => (
          <div
            key={`${disk.name}-${volume.name}-${pIndex}`}
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
              <img src={'./hardware_icons/storage-device.png'} alt="storage-device" />
            </div>
            <div
              style={{
                gridColumn: '1 / 3',
              }}
            >
              {disk.name}
            </div>
            <div>{t('labels.driveLetter')}</div>
            <div>{volume.name}</div>
            <div>{t('labels.freeSpaceGb')}</div>
            <div>{volume.freeSpace}</div>
            <div>{t('labels.totalSpace')}</div>
            <div>{volume.totalSpace}</div>
          </div>
        ))
      )}
    </>
  );
}
