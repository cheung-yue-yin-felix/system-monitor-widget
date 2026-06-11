using HardwareMonitor.Domain.Models;

namespace HardwareMonitor.Application.Interfaces;

public interface ILibreHardwareMonitorService
{
    IReadOnlyList<SensorInfo> GetCpuPowers();
    IReadOnlyList<SensorInfo> GetGpuPowers();
    IReadOnlyList<SensorInfo> GetCpuTemperatures();
    IReadOnlyList<SensorInfo> GetGpuTemperatures();
    IReadOnlyList<SensorInfo> GetGpuLoads();
    IReadOnlyList<SensorInfo> GetGpuClocks();
    IReadOnlyList<SensorInfo> GetCpuLoads();
    SensorSnapshot GetSnapshot();
}
