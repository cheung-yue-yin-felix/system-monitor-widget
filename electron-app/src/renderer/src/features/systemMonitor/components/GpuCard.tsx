import { useTranslation } from 'react-i18next'
import type React from 'react'
import type { GpuMetrics } from '../../../types/hardware'

interface GpuCardProps {
  gpu: GpuMetrics
}

export default function GpuCard({ gpu }: GpuCardProps): React.JSX.Element {
  const dpr = window.devicePixelRatio
  const { t } = useTranslation()

  return (
    <div
      className="card"
      style={
        {
          '--dpr': dpr,
          display: 'grid',
          gridTemplateColumns: '100px 150px',
          gap: '0px',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '18px'
        } as React.CSSProperties
      }
    >
      <div className="hardware-icon">
        <img src={'./hardware_icons/gpu.png'} alt="gpu-icon" />
      </div>
      <div
        style={{
          gridColumn: '1 / 3'
        }}
      >
        {gpu.name}
      </div>
      <div>{t('labels.clockMHz')}</div>
      <div>{gpu.clockSpeed}</div>
      <div>{t('labels.usagePercent')}</div>
      <div>{gpu.load}</div>
      <div>{t('labels.videoRamSize')}</div>
      <div>{gpu.videoRamSize}</div>
      <div>{t('labels.temperatureC')}</div>
      <div>{gpu.temperature}</div>
      <div>{t('labels.powerW')}</div>
      <div>{gpu.power}</div>
    </div>
  )
}
