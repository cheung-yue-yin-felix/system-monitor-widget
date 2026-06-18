export interface CpuMetrics {
  name: string
  clockSpeed: string
  load: string
  temperature: string
  power: string
}

export interface GpuMetrics {
  name: string
  clockSpeed: string
  videoRamSize: string
  load: string
  temperature: string
  power: string
}

export interface RamModuleMetrics {
  name: string
  size: string
  type: string
  formFactor: string
}

export interface RamMetrics {
  availableMemory: string
  totalMemory: string
  usedMemory: string
  modules?: RamModuleMetrics[]
}

export interface VolumeMetrics {
  name: string
  freeSpace: string
  totalSpace: string
}

export interface PartitionMetrics {
  name: string
  volumes: VolumeMetrics[]
}

export interface DiskMetrics {
  name: string
  type: string
  partitions: PartitionMetrics[]
}

export interface NetworkMetrics {
  name: string
  type: string
  dhcpServer: string
  macAddress: string
  ipAddresses: string[]
  ipSubnets: string[]
  defaultIpGateways: string[]
  uploadSpeed: string
  downloadSpeed: string
}

export interface HardwareMetrics {
  timestamp: string
  cpus?: CpuMetrics[] | null
  cpu?: CpuMetrics | null
  gpus?: GpuMetrics[] | null
  gpu?: GpuMetrics | null
  ram: RamMetrics
  disks: DiskMetrics[]
  networks: NetworkMetrics[]
}

export interface UseMetricsStreamResult {
  data: HardwareMetrics | null
  status: 'idle' | 'connecting' | 'open' | 'error' | 'closed'
  error: Error | null
}
