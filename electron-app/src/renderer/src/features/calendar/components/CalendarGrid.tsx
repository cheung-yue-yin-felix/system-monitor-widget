import { isToday, isSameMonth, format } from 'date-fns';
import type React from 'react';

interface CalendarGridProps {
  days: Date[];
  today: Date;
}

export default function CalendarGrid({ days, today }: CalendarGridProps): React.JSX.Element {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
      }}
    >
      {days.map((day) => {
        const isWeekStart = new Date(day.toISOString()).getDay() === 0;
        const isTodayDay = isToday(day);
        const isCurrentMonthDay = isSameMonth(day, today);

        return (
          <div
            key={day.toISOString()}
            style={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: isTodayDay ? 700 : 500,
              color: isCurrentMonthDay ? (isWeekStart ? 'red' : 'white') : 'darkgray',
              backgroundColor: isTodayDay ? 'pink' : 'transparent',
              border: 'none',
              cursor: 'default',
            }}
          >
            {format(day, 'd')}
          </div>
        );
      })}
    </div>
  );
}
