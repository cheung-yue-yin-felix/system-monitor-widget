import { useState, useEffect } from 'react'
import type { HardwareMetrics } from '../../../../../shared/types/hardware'
import type { UseMetricsStreamResult } from '../../../types/hardware'

export function useMetricsStream(): UseMetricsStreamResult {
  const [data, setData] = useState<HardwareMetrics | null>(null)
  const [status, setStatus] = useState<UseMetricsStreamResult['status']>('idle')
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    window.api.metrics.subscribe()

    const removeUpdate = window.api.metrics.onUpdate((payload) => {
      setData(payload)
    })

    const removeStatus = window.api.metrics.onStatus((nextStatus) => {
      setStatus(nextStatus as UseMetricsStreamResult['status'])
      if (nextStatus === 'open') setError(null)
      if (nextStatus === 'error') setError(new Error('Metrics stream failed'))
    })

    return () => {
      removeUpdate()
      removeStatus()
      window.api.metrics.unsubscribe()
    }
  }, [])

  return { data, status, error }
}
