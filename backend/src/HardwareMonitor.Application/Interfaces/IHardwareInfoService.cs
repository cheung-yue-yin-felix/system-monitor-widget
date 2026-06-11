using HardwareMonitor.Domain;
using HardwareMonitor.Domain.Models;

namespace HardwareMonitor.Application.Interfaces;

public interface IHardwareInfoService
{
    HardwareMetrics GetHardwareInfo();
}