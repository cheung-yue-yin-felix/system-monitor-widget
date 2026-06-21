import { ipcMain, BrowserWindow } from 'electron'
import { store } from '../store'
import type { Settings } from '../../shared/types/settings'

const getSettings = (): Settings => store.get('settings')

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
