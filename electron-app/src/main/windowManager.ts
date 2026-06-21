import { BrowserWindow, screen } from 'electron'
import { store } from './store'
import type { WindowState } from '../shared/types/window'

const trackedWindows = new Map<BrowserWindow, WindowState>()
let saveTimeout: ReturnType<typeof setTimeout> | null = null
let isQuitting = false

function getDisplayIdForBounds(bounds: Electron.Rectangle): number {
  return screen.getDisplayNearestPoint({
    x: Math.round(bounds.x + bounds.width / 2),
    y: Math.round(bounds.y + bounds.height / 2)
  }).id
}

function buildState(win: BrowserWindow, page: string): WindowState {
  const bounds = win.getBounds()
  return {
    page,
    displayId: getDisplayIdForBounds(bounds),
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    fullScreen: win.isFullScreen()
  }
}

function persist(): void {
  const states: WindowState[] = []
  trackedWindows.forEach((state, win) => {
    if (!win.isDestroyed()) {
      states.push(buildState(win, state.page))
    }
  })
  store.set('windows', states)
}

function schedulePersist(): void {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveTimeout = null
    persist()
  }, 300)
}

/** Flush any debounced save immediately. */
export function setQuitting(value: boolean): void {
  isQuitting = value
}

export function getIsQuitting(): boolean {
  return isQuitting
}

export function flushPendingSave(): void {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
    saveTimeout = null
  }
  persist()
}

/** Start tracking a window so its monitor/page/bounds are saved and restored. */
export function trackWindow(win: BrowserWindow, page: string): void {
  trackedWindows.set(win, buildState(win, page))

  win.on('move', schedulePersist)
  win.on('resize', schedulePersist)
  win.on('enter-full-screen', schedulePersist)
  win.on('leave-full-screen', schedulePersist)
  win.once('closed', () => {
    trackedWindows.delete(win)
    if (!isQuitting) {
      flushPendingSave()
    }
  })

  persist()
}

/** Load the list of windows that were open the last time the app ran. */
export function getSavedWindows(): WindowState[] {
  return store.get('windows') ?? []
}

/** Clear saved window state (useful for a "forget layout" action). */
export function clearSavedWindows(): void {
  store.set('windows', [])
}
