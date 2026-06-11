using HardwareMonitor.Application.Interfaces;
using HardwareMonitor.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace HardwareMonitor.Application;

public static class DependencyInjection
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddSingleton<IHardwareMetricPoller, HardwareMetricPoller>();
        services.AddSingleton<HardwareMetricsCache>();
        services.AddSingleton<IHardwareMetricsCache>(sp => sp.GetRequiredService<HardwareMetricsCache>());
        services.AddHostedService(sp => sp.GetRequiredService<HardwareMetricsCache>());
    }
}