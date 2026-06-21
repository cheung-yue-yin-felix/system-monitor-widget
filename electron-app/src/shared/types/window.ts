export interface WindowState {
  /** The route/page this window is showing (e.g. '', 'system', 'settings'). */
  page: string
  /** Electron display id of the monitor the window is on. */
  displayId: number
  /** Window bounds on that monitor. */
  x: number
  y: number
  width: number
  height: number
  /** Whether the window is in fullscreen mode. */
  fullScreen: boolean
}
