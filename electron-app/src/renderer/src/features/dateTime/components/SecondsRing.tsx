import { useSecondsRing } from '../hooks'
import type React from 'react'

interface SecondsRingProps {
  seconds: number
}

export default function SecondsRing({ seconds }: SecondsRingProps): React.JSX.Element {
  const canvasRef = useSecondsRing(seconds)

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
        borderRadius: '28px',
        pointerEvents: 'none'
      }}
    />
  )
}
