# System Monitor Widget

A desktop widget built with [Electron](https://www.electronjs.org/), [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). It displays the current date, time, weather and monitors PC hardware on Windows.

## Features

- **Date & Time** – a clean, always-visible clock.
- **Weather** – current weather information at a glance.
- **Hardware Monitor** – CPU / GPU / memory / disk usage and temperatures, powered by the .NET backend in `../backend`.
- **Cross-platform builds** – packaged for Windows, macOS and Linux via [electron-builder](electron-builder.yml).

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite (via [electron-vite](https://electron-vite.org/))
- **Desktop:** Electron 39 + electron-vite
- **Hardware data:** .NET backend (`../backend/src/HardwareMonitor.Api`)
- **i18n:** i18next + react-i18next
- **Routing:** react-router-dom
- **Linting / Formatting:** ESLint + Prettier

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install dependencies

```bash
npm install
```

### Development

Run the Electron renderer and main processes only (the .NET backend is started separately or in `spawn` mode):

```bash
npm run dev
```

Run the .NET backend separately:

```bash
npm run dev:backend
```

Run both the backend and Electron together:

```bash
npm run dev:all
```

### Build

Type-check and bundle the application:

```bash
npm run build
```

Create platform-specific installers:

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# Unpacked directory (no installer)
npm run build:unpack
```

Build configuration is defined in [electron-builder.yml](electron-builder.yml).

### Lint & Format

```bash
# Check and fix code style
npm run format

# Run ESLint
npm run lint

# Run TypeScript checks
npm run typecheck
```

## Project Structure

```
electron-app/
├── build/              # Build resources (icons, entitlements, etc.)
├── out/                # electron-vite output (main, preload, renderer)
├── resources/          # Extra assets packaged with the app
├── src/
│   ├── main/           # Electron main process
│   ├── preload/        # Preload scripts
│   └── renderer/       # React application
├── electron-builder.yml # Packaging / installer configuration
├── electron.vite.config.ts
└── package.json
```

## License

This project is released under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).
You are free to copy, modify, distribute and use the work, even for commercial purposes, without asking permission.
