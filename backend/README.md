# System Monitor Widget — Backend

The .NET 10 hardware monitoring service for System Monitor Widget. It exposes a lightweight ASP.NET Core API that collects real-time PC hardware metrics and streams them to the Electron frontend.

## Architecture

The backend follows a Clean Architecture / layered approach:

| Project | Responsibility |
| --- | --- |
| `HardwareMonitor.Api` | ASP.NET Core minimal API, CORS, middleware and endpoint mapping |
| `HardwareMonitor.Application` | Use cases, background pollers, caching and abstractions |
| `HardwareMonitor.Domain` | Domain models (`HardwareMetrics`, `CpuMetrics`, `GpuMetrics`, etc.) |
| `HardwareMonitor.Infrastructure` | Hardware data providers (`LibreHardwareMonitorService`, `HardwareInfoService`) |

## Key Dependencies

- [LibreHardwareMonitorLib](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor) – low-level sensor readings
- [Hardware.Info](https://github.com/Jinjinov/Hardware.Info) – system hardware information
- [Microsoft.AspNetCore.OpenApi](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) – OpenAPI document generation

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/metrics` | Returns the latest collected hardware metrics |
| GET | `/api/metrics/stream` | Server-sent events stream of hardware metrics |

## Running the Backend

### Standalone

```bash
cd backend/src/HardwareMonitor.Api
dotnet run
```

Or from the Electron app folder:

```bash
cd electron-app
npm run dev:backend
```

### Build & Publish

```bash
cd backend/src/HardwareMonitor.Api

# Run on Windows x64
dotnet publish -c Release -r win-x64 --self-contained true
```

The Electron app pulls the published backend from `backend/publish` and packages it as an extra resource (see `extraResources` in [electron-builder.yml](../electron-app/electron-builder.yml)).

## Embedded Mode

When the backend is started by the bundled Electron app, it is launched with the `--embedded` flag. In embedded mode:

- CORS allows `file://` origins.
- HTTPS redirection is disabled.
- API-key middleware is bypassed.

In standalone / development mode, the API requires an API key via `ApiKeyMiddleware` and restricts origins to the frontend dev server.

## Project Structure

```
backend/
├── publish/              # dotnet publish output consumed by Electron
└── src/
    ├── HardwareMonitor.Api/
    │   ├── Authentications/
    │   │   └── ApiKeyMiddleware.cs
    │   └── Program.cs
    ├── HardwareMonitor.Application/
    │   ├── Interfaces/
    │   ├── Services/
    │   │   ├── HardwareMetricPoller.cs
    │   │   └── HardwareMetricsCache.cs
    │   └── Utils/
    ├── HardwareMonitor.Domain/
    │   └── Models/
    │       ├── HardwareMetrics.cs
    │       ├── CpuMetrics.cs
    │       ├── GpuMetrics.cs
    │       ├── RamMetrics.cs
    │       ├── DiskMetrics.cs
    │       ├── NetworkMetrics.cs
    │       └── ...
    └── HardwareMonitor.Infrastructure/
        ├── Services/
        │   ├── HardwareInfoService.cs
        │   └── LibreHardwareMonitorService.cs
        └── Utils/
```

## License

This project is released under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).  
You are free to copy, modify, distribute and use the work, even for commercial purposes, without asking permission.
