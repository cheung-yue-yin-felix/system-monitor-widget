import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { enGB, zhHK, zhCN } from 'date-fns/locale';

const localeMap = {
  en: enGB,
  tc: zhHK,
  sc: zhCN,
} as const;

interface UseDateTimeParams {
  language: string;
  dateFormat: string;
  timeFormat: string;
  weekDayFormat: string;
}

interface DateTimeResult {
  weekDayYear: string;
  monthDate: string;
  timeStr: string;
  seconds: number;
}

export function useDateTime({
  language,
  dateFormat,
  timeFormat,
  weekDayFormat,
}: UseDateTimeParams): DateTimeResult {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const locale = localeMap[language as keyof typeof localeMap];

  return {
    weekDayYear: format(date, `${weekDayFormat} yyyy`, { locale }),
    monthDate: format(date, dateFormat, { locale }),
    timeStr: format(date, timeFormat, { locale }),
    seconds: date.getSeconds(),
  };
}
