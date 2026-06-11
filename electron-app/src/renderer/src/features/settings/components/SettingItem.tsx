import type { ChangeEvent } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface SettingItemProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function SettingItem({
                                      label,
                                      value,
                                      options,
                                      onChange,
                                    }: SettingItemProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '10px 14px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      <span
        style={{
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'white',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={handleChange}
        style={{
          padding: '6px 10px',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          background: 'rgba(0, 0, 0, 0.3)',
          color: 'white',
          fontSize: '0.85rem',
          fontFamily: 'inherit',
          cursor: 'pointer',
          outline: 'none',
          minWidth: '120px',
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{
              background: '#1a1a1a',
              color: 'white',
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
