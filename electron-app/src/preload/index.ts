import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Settings } from '../shared/types/settings'
import type { HardwareMetrics } from '../shared/types/hardware'

// Custom APIs for renderer
const api = {
  weather: {
    getCurrent: (language: string) => ipcRenderer.invoke('weather:getCurrent', language),
    getForecast: (language: string) => ipcRenderer.invoke('weather:getForecast', language)
  },
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    set: (settings: Settings) => ipcRenderer.send('settings:set', settings),
    onChange: (callback: (settings: Settings) => void) => {
      const handler = (_: unknown, settings: Settings): void => callback(settings)
      ipcRenderer.on('settings:changed', handler)
      return () => ipcRenderer.off('settings:changed', handler)
    }
  },
  metrics: {
    subscribe: () => ipcRenderer.send('metrics:subscribe'),
    unsubscribe: () => ipcRenderer.send('metrics:unsubscribe'),
    onUpdate: (callback: (data: HardwareMetrics) => void) => {
      const handler = (_: unknown, data: HardwareMetrics) => callback(data)
      ipcRenderer.on('metrics:update', handler)
      return () => ipcRenderer.off('metrics:update', handler)
    },
    onStatus: (callback: (status: string) => void) => {
      const handler = (_: unknown, status: string) => callback(status)
      ipcRenderer.on('metrics:status', handler)
      return () => ipcRenderer.off('metrics:status', handler)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
