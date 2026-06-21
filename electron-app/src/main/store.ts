import ElectronStore from 'electron-store'
import type { Settings } from '../shared/types/settings'
import type { WindowState } from '../shared/types/window'

// electron-store v11 is ESM-only; when bundled for the CJS main process,
// `require('electron-store')` returns the module wrapper `{ default: Store }`.
const RawStore =
  (ElectronStore as unknown as { default?: typeof ElectronStore }).default ?? ElectronStore

export interface AppStore {
  settings: Settings
  windows: WindowState[]
}

export const store = new RawStore<AppStore>({
  defaults: {
    settings: {
      language: 'en',
      dateFormat: 'MMM d',
      timeFormat: 'hh:mm a',
      weekDayFormat: 'ccccc',
      district: 'KT',
      tempStation: 'KTG'
    },
    windows: []
  }
})
