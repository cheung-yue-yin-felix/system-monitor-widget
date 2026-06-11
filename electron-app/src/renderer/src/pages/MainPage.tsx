import MainPanel from '../components/MainPanel';
import ForecastPanel from '../components/ForecastPanel';
import type React from 'react';

export default function MainPage(): React.JSX.Element {
  return (
    <ul className="main-grid">
      <MainPanel />
      <ForecastPanel />
    </ul>
  );
}
