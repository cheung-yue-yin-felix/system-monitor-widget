import { WeatherWidget } from '../features/weather';
import { DateTimeWidget } from '../features/dateTime';
import { CalendarWidget } from '../features/calendar';
import type React from 'react';

export default function MainPanel(): React.JSX.Element {
  return (
    <>
      <li>
        <WeatherWidget />
      </li>
      <li>
        <DateTimeWidget />
      </li>
      <li>
        <CalendarWidget />
      </li>
    </>
  );
}
