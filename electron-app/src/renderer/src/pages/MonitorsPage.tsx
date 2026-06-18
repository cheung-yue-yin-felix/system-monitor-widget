import { useSearchParams } from 'react-router-dom'
import type React from 'react'
import { useMemo } from 'react'

function MonitorsPage(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const dpr = window.devicePixelRatio

  const cardStyle = useMemo(
    () =>
      ({
        '--dpr': dpr,
        width: '100vw',
        height: '100vh',
        borderRadius: '0%'
      }) as React.CSSProperties,
    [dpr]
  )

  const flexCenterStyle = useMemo(
    () =>
      ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100% - 18px)'
      }) as React.CSSProperties,
    []
  )

  return (
    <div className="card" style={cardStyle}>
      <div style={flexCenterStyle}>
        <h1 className="card-title">{id}</h1>
      </div>
    </div>
  )
}

export default MonitorsPage
