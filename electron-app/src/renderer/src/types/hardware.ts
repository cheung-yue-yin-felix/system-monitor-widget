import { HardwareMetrics } from '../../../shared/types/hardware'

export interface UseMetricsStreamResult {
  data: HardwareMetrics | null
  status: 'idle' | 'connecting' | 'open' | 'error' | 'closed'
  error: Error | null
}
