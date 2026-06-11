import { CpuCard, GpuCard, RamCard, NetworkCard, DiskCard } from '../features/systemMonitor';
import { useMetricsStream } from '../features/systemMonitor/hooks';

import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import type React from 'react';

export default function SystemPanel(): React.JSX.Element {
  const { data, status, error } = useMetricsStream();

  console.log('Connection Status: ', status);

  return (
    <>
      {error && <ErrorMessage error={error} />}

      {!data ? (
        <Loading />
      ) : (
        <ul className="main-grid">
          {data.cpu && (
            <li>
              <CpuCard cpu={data.cpu} />
            </li>
          )}
          {data.cpus?.map((cpu, index) => (
            <li key={index}>
              <CpuCard cpu={cpu} />
            </li>
          ))}
          {data.gpu && (
            <li>
              <GpuCard gpu={data.gpu} />
            </li>
          )}
          {data.gpus?.map((gpu, index) => (
            <li key={index}>
              <GpuCard gpu={gpu} />
            </li>
          ))}
          <RamCard ram={data.ram} />
          <NetworkCard networks={data.networks} />
          {data.disks.map((disk) => (
            <DiskCard disk={disk} key={disk.name} />
          ))}
        </ul>
      )}
    </>
  );
}
