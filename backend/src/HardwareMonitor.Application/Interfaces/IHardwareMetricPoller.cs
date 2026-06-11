using HardwareMonitor.Domain.Models;

namespace HardwareMonitor.Application.Interfaces;

public interface IHardwareMetricPoller
{
    IAsyncEnumerable<HardwareMetrics> StreamAsync(TimeSpan interval, CancellationToken cancellationToken = default);
}