using HardwareMonitor.Application.Interfaces;
using HardwareMonitor.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace HardwareMonitor.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddSingleton<IHardwareInfoService, HardwareInfoService>();
        services.AddSingleton<ILibreHardwareMonitorService, LibreHardwareMonitorService>();
    }
}