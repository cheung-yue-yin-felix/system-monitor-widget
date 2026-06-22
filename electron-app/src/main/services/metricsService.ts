import { BrowserWindow } from 'electron'
import { EventSource } from 'eventsource'  // npm install eventsource
import type { HardwareMetrics } from '../../shared/types/hardware'

type MetricsStatus = 'idle' | 'connecting' | 'open' | 'error' | 'closed'

let subscriberCount = 0
let eventSource: EventSource | null = null
let retryTimeoutId: ReturnType<typeof setTimeout> | null = null
let retryCount = 0

const maxRetries = 10
const baseDelay = 1000

function getStreamUrl(): string {
  const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000'
  const apiKey = import.meta.env.VITE_API_KEY ?? ''
  return `${baseUrl}/api/metrics/stream?apiKey=${apiKey}`
}

function broadcastStatus(status: MetricsStatus): void {
  BrowserWindow.getAllWindows().forEach((win) => {
    if (!win.isDestroyed()) {
      win.webContents.send('metrics:status', status)
    }
  })
}

function broadcastUpdate(data: HardwareMetrics): void {
  BrowserWindow.getAllWindows().forEach((win) => {
    if (!win.isDestroyed()) {
      win.webContents.send('metrics:update', data)
    }
  })
}

function connect(): void {
  const url = getStreamUrl()
  if (!url || subscriberCount === 0) return

  // Close any existing connection before opening a new one (retry case)
  eventSource?.close()
  if (retryTimeoutId) {
    clearTimeout(retryTimeoutId)
    retryTimeoutId = null
  }

  broadcastStatus('connecting')

  eventSource = new EventSource(url)

  eventSource.onopen = () => {
    retryCount = 0
    broadcastStatus('open')
  }

  eventSource.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data) as HardwareMetrics
      broadcastUpdate(payload)
    } catch (e) {
      console.error('[metricsService] Failed to parse SSE payload', e)
    }
  }

  eventSource.onerror = () => {
    eventSource?.close()
    eventSource = null

    if (subscriberCount === 0) return  // nobody listening anymore

    if (retryCount < maxRetries) {
      const delay = baseDelay * Math.pow(1.5, retryCount)
      retryCount++
      retryTimeoutId = setTimeout(connect, delay)
    } else {
      broadcastStatus('error')
    }
  }
}

function disconnect(): void {
  if (retryTimeoutId) {
    clearTimeout(retryTimeoutId)
    retryTimeoutId = null
  }
  eventSource?.close()
  eventSource = null
  retryCount = 0
  broadcastStatus('closed')
}

export function subscribe(): void {
  subscriberCount++
  if (subscriberCount === 1) {
    connect()
  }
}

export function unsubscribe(): void {
  subscriberCount = Math.max(0, subscriberCount - 1)
  if (subscriberCount === 0) {
    disconnect()
  }
}
