import type React from 'react';

interface WeekDaysHeaderProps {
  weekdays: string[];
  language: string;
}

export default function WeekDaysHeader({ weekdays, language }: WeekDaysHeaderProps): React.JSX.Element {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        marginBottom: '8px',
        gap: '4px',
      }}
    >
      {weekdays.map((day) => (
        <div
          key={day}
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'white',
            padding: '8px 0',
          }}
        >
          {language === 'en' ? day[0] : day[day.length - 1]}
        </div>
      ))}
    </div>
  );
}
