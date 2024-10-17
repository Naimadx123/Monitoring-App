import * as React from 'react';
import { useEffect, useState } from 'react';
import si from 'systeminformation';

interface CpuInfo {
  manufacturer: string;
  brand: string;
  speed: number;
  cores: number;
  physicalCores: number;
}

const App: React.FC = () => {
  const [cpuInfo, setCpuInfo] = useState<CpuInfo | null>(null);

  useEffect(() => {
    const fetchCpuInfo = async () => {
      const info = await si.cpu();
      setCpuInfo(info);
    };

    fetchCpuInfo();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CPU Information</h1>
      {cpuInfo ? (
        <ul>
          <li>Manufacturer: {cpuInfo.manufacturer}</li>
          <li>Brand: {cpuInfo.brand}</li>
          <li>Speed: {cpuInfo.speed} GHz</li>
          <li>Cores: {cpuInfo.cores}</li>
          <li>Physical Cores: {cpuInfo.physicalCores}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
