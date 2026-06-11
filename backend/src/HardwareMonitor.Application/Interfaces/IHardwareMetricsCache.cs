using HardwareMonitor.Domain.Models;

namespace HardwareMonitor.Application.Interfaces;

public interface IHardwareMetricsCache
{
    HardwareMetrics? Latest { get; }
    IAsyncEnumerable<HardwareMetrics> StreamAsync(CancellationToken cancellationToken = default);
}
