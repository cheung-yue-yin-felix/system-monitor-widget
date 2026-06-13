# System Monitor Widget

A Windows desktop widget that displays the current date, time, weather and real-time PC hardware metrics.

## Features

- **Clock & Calendar** – current date and time in a clean widget UI.
- **Weather** – current weather information at a glance.
- **Hardware Monitoring** – live CPU, GPU, RAM, disk and network metrics.
- **Cross-platform Packaging** – built for Windows, macOS and Linux via [electron-builder](electron-app/electron-builder.yml).

## Repository Structure

```
SystemMonitorWidget/
├── backend/                # .NET 10 hardware monitoring service
│   └── src/
│       ├── HardwareMonitor.Api            # ASP.NET Core API
│       ├── HardwareMonitor.Application    # Use cases, pollers, caching
│       ├── HardwareMonitor.Domain         # Domain models
│       └── HardwareMonitor.Infrastructure # Hardware info providers
├── electron-app/           # Electron + React + TypeScript desktop app
│   ├── src/
│   │   ├── main/         # Electron main process
│   │   ├── preload/      # Preload scripts
│   │   └── renderer/     # React application
│   └── electron-builder.yml
└── SystemMonitorWidget.sln
```

## Tech Stack

- **Desktop:** Electron 39, React 19, TypeScript 5, Vite (via [electron-vite](https://electron-vite.org/))
- **Backend:** .NET 10 ASP.NET Core minimal API
- **Hardware data:** LibreHardwareMonitorLib, Hardware.Info
- **Routing & i18n:** react-router-dom, i18next
- **Tooling:** ESLint, Prettier, electron-builder

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet)
- Windows (primary target) – the hardware monitor backend uses Windows-specific libraries

### Install dependencies

```bash
cd electron-app
npm install
```

### Run in development

Start both the .NET backend and the Electron frontend together:

```bash
cd electron-app
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1: backend
cd electron-app
npm run dev:backend

# Terminal 2: Electron frontend
cd electron-app
npm run dev
```

### Build the application

```bash
cd electron-app

# Windows installer
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## Development

| Command | Description |
| --- | --- |
| `npm run dev` | Start Electron in development mode |
| `npm run dev:backend` | Start the .NET backend |
| `npm run dev:all` | Start backend and Electron together |
| `npm run build` | Bundle the renderer and main process |
| `npm run build:win` | Build Windows installer |
| `npm run build:mac` | Build macOS DMG |
| `npm run build:linux` | Build Linux packages |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## License

This project is released under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).  
You are free to copy, modify, distribute and use the work, even for commercial purposes, without asking permission.
