import { ipcMain } from 'electron'
import { subscribe, unsubscribe } from '../services/metricsService'

export function registerMetricsIpcHandlers(): void {
  ipcMain.on('metrics:subscribe', () => subscribe())
  ipcMain.on('metrics:unsubscribe', () => unsubscribe())
}
