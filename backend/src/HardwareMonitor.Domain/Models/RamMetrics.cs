namespace HardwareMonitor.Domain.Models;

public class RamMetrics
{
    public string AvailableMemory { get; set; } = "";
    public string TotalMemory { get; set; } = "";
    public string UsedMemory { get; set; } = "";
    public List<RamModuleMetrics> Modules { get; set; } = [];
}
