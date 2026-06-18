import { app, shell, BrowserWindow, screen, Tray, Menu } from 'electron'
import type { MenuItemConstructorOptions } from 'electron'
import { join, dirname } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { spawn, exec } from 'child_process'
import { existsSync } from 'fs'
import { registerWeatherIpcHandlers } from './ipc/weatherIpc'
import { registerSettingsIpcHandlers } from './ipc/settingsIpc'

function manageAdminStartup(enable: boolean = true): void {
  if (process.platform !== 'win32' || is.dev) {
    if (is.dev) console.log('Skipping Task Scheduler configuration in development')
    return
  }

  const taskName: string = 'SystemMonitorWidgetAdminStartup'
  const appPath: string = app.getPath('exe')

  let command: string = ''

  if (enable) {
    command = `schtasks /create /tn "${taskName}" /tr "\\"${appPath}"\\" /sc onlogon /rl HIGHEST /f`
  } else {
    command = `schtasks /delete /tn "${taskName}" /f`
  }

  exec(command, (error) => {
    if (error) {
      console.error(`[Task Scheduler Error]: ${error.message}`)
      return
    }
    console.log(`[Task Scheduler Success]: Admin startup configured (Enabled: ${enable})`)
  })
}

function identifyMonitors(displays: Electron.Display[]): void {
  displays.forEach((display, index) => {
    const window = new BrowserWindow({
      frame: false,
      show: false,
      transparent: true,
      skipTaskbar: true,
      x: display.workArea.x,
      y: display.workArea.y,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        contextIsolation: true,
        sandbox: false
      }
    })

    if (screen.getPrimaryDisplay().id === display.id) {
      window.setSize(display.workArea.width, display.workArea.height)
    } else {
      window.setFullScreen(true)
    }

    window.on('ready-to-show', () => {
      window.show()
      setTimeout(() => {
        window.close()
      }, 3000)
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      window.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#monitors?id=${index + 1}`)
    } else {
      window.loadFile(join(__dirname, '../renderer/index.html'), {
        hash: `monitors?id=${index + 1}`
      })
    }
  })
}

function createWindow(page: string, display: Electron.Display): void {
  const window = new BrowserWindow({
    x: display.workArea.x,
    y: display.workArea.y,
    transparent: true,
    frame: false,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false
    }
  })

  if (screen.getPrimaryDisplay().id === display.id) {
    window.setSize(display.workArea.width, display.workArea.height)
  } else {
    window.setFullScreen(true)
  }

  window.on('ready-to-show', () => {
    window.show()
  })

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'] + (page.length > 0 ? `/#${page}` : ''))
  } else if (page.length > 0) {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: page })
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

let tray: Tray | null = null

function toPascalCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove punctuation
    .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, chr) => chr.toUpperCase())
}

function createTrayMenu(displays: Electron.Display[]): void {
  tray = new Tray(icon)
  const pages = ['', 'system', 'settings']
  const template: MenuItemConstructorOptions[] = []

  tray.setToolTip(app.name)

  template.push({ label: 'Identify', click: () => identifyMonitors(displays) })

  template.push({ type: 'separator' })

  pages.forEach((page) => {
    const subMenu: MenuItemConstructorOptions[] = []

    displays.forEach((display, index) => {
      subMenu.push({
        label: `@${index + 1}:${display.workArea.width}x${display.workArea.height}`,
        click: () => createWindow(page, display)
      })
    })

    template.push({
      label: page.length > 0 ? `Open ${toPascalCase(page)}` : 'Open Main',
      type: 'submenu',
      submenu: subMenu
    })
  })

  template.push({ type: 'separator' })

  template.push({
    label: 'Auto Start',
    type: 'checkbox',
    checked: true,
    click: (item) => manageAdminStartup(item.checked)
  })

  template.push({ type: 'separator' })

  template.push({
    label: 'Close All Windows',
    click: () => BrowserWindow.getAllWindows().forEach((window) => window.close())
  })

  template.push({ role: 'quit' })

  const contextMenu = Menu.buildFromTemplate(template)

  tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.cheungyueyinfelix.systemmonitorwidget')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  manageAdminStartup(true)

  registerWeatherIpcHandlers()
  registerSettingsIpcHandlers()

  const displays: Electron.Display[] = screen.getAllDisplays()

  const shouldSpawnBackend = process.env.ELECTRON_NO_BACKEND_SPAWN !== 'true'
  let backend: ReturnType<typeof spawn> | undefined

  if (shouldSpawnBackend) {
    const backendPath = is.dev
      ? join(process.cwd(), '..', 'backend', 'publish', 'HardwareMonitor.Api.exe')
      : join(process.resourcesPath, 'backend', 'HardwareMonitor.Api.exe')

    if (!existsSync(backendPath)) {
      console.error(`[Main] Backend executable not found: ${backendPath}`)
      console.error('[Main] Run "dotnet publish" for the backend first.')
    } else {
      backend = spawn(backendPath, ['--embedded'], {
        cwd: dirname(backendPath),
        env: {
          ...process.env,
          ASPNETCORE_URLS: 'http://localhost:5000'
        }
      })

      backend.stdout?.on('data', (data) => console.log(`[Backend] ${data}`))
      backend.stderr?.on('data', (data) => console.error(`[Backend] ${data}`))
    }
  } else {
    console.log('[Main] ELECTRON_NO_BACKEND_SPAWN is set; using external backend')
  }

  createTrayMenu(displays)

  function killBackend(): void {
    if (!backend) return

    if (process.platform === 'win32' && backend.pid) {
      spawn('taskkill', ['/F', '/T', '/PID', backend.pid.toString()], {
        shell: true,
        windowsHide: true
      })
    } else {
      backend.kill('SIGKILL')
    }
  }

  app.on('before-quit', killBackend)
  app.on('will-quit', killBackend)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('', screen.getPrimaryDisplay())
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})
