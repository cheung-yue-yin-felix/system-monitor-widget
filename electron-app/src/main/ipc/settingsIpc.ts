import { ipcMain, BrowserWindow } from 'electron'
import ElectronStore from 'electron-store'
import type { Settings } from '../../shared/types/settings'

// electron-store v11 is ESM-only; when bundled for the CJS main process,
// `require('electron-store')` returns the module wrapper `{ default: Store }`.
const Store =
  (ElectronStore as unknown as { default?: typeof ElectronStore }).default ?? ElectronStore

const store = new Store<{ settings: Record<string, unknown> }>()

const getSettings = (): Settings => ({
  language: 'en',
  dateFormat: 'MMM d',
  timeFormat: 'hh:mm a',
  weekDayFormat: 'ccccc',
  district: 'KT',
  tempStation: 'KTG',
  ...(store.get('settings') as Record<string, unknown>)
})

const broadcastSettings = (): void => {
  const settings = getSettings()
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.send('settings:changed', settings)
  })
}

export function registerSettingsIpcHandlers(): void {
  ipcMain.handle('settings:get', () => getSettings())
  ipcMain.on('settings:set', (_, settings) => {
    store.set('settings', settings)
    broadcastSettings()
  })
}
