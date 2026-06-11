using System.Diagnostics;
using System.Runtime.CompilerServices;
using HardwareMonitor.Application.Interfaces;
using HardwareMonitor.Domain.Models;

namespace HardwareMonitor.Application.Services;

public class HardwareMetricPoller(IHardwareInfoService hardware): IHardwareMetricPoller
{
    public async IAsyncEnumerable<HardwareMetrics> StreamAsync(
        TimeSpan interval, 
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var stopwatch = new Stopwatch();
        
        while (!cancellationToken.IsCancellationRequested)
        {
            stopwatch.Restart();
            yield return hardware.GetHardwareInfo();

            var remaining = interval - stopwatch.Elapsed;
            if (remaining <= TimeSpan.Zero) continue;
            try
            {
                await Task.Delay(remaining, cancellationToken);
            }
            catch (OperationCanceledException)
            {
                yield break;
            }
        }
    }
}
