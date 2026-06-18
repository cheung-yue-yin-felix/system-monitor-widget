import { useState, useEffect, useRef } from 'react'
import { config } from '../../../configs/configs'
import type { HardwareMetrics, UseMetricsStreamResult } from '../../../types/hardware'

export function useMetricsStream(): UseMetricsStreamResult {
  const apiKey = config.systemMonitorApi.apiKey
  const baseUrl = config.systemMonitorApi.baseUrl
  const url = baseUrl ? `${baseUrl}/api/metrics/stream?apiKey=${apiKey}` : ''

  const [data, setData] = useState<HardwareMetrics | null>(null)
  const [status, setStatus] = useState<UseMetricsStreamResult['status']>('idle')
  const [error, setError] = useState<Error | null>(null)
  const esRef = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!url) return

    let retryCount = 0
    const maxRetries = 10
    const baseDelay = 1000
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let es: EventSource | null = null

    function connect(): void {
      setStatus('connecting')
      es = new EventSource(url)
      esRef.current = es

      es.onopen = () => {
        retryCount = 0
        setStatus('open')
        setError(null)
      }

      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data) as HardwareMetrics
          setData(payload)
        } catch (e) {
          console.error('Failed to parse SSE payload', e)
        }
      }

      es.onerror = () => {
        es?.close()

        if (retryCount < maxRetries) {
          const delay = baseDelay * Math.pow(1.5, retryCount)
          retryCount++
          timeoutId = setTimeout(connect, delay)
        } else {
          setStatus('error')
          setError(new Error('EventSource connection failed after max retries'))
        }
      }
    }

    connect()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (es) es.close()
      setStatus('closed')
    }
  }, [url])

  return { data, status, error }
}
