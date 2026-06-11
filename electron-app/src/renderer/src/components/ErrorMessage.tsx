import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  error?: Error | string | ReactNode | null;
  children?: ReactNode;
}

export default function ErrorMessage({ error, children }: ErrorMessageProps) {
  const { t } = useTranslation();
  const dpr = window.devicePixelRatio;

  const errorText = error
    ? typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : String(error)
    : children;

  return (
    <div
      className="card"
      style={{
        '--dpr': dpr,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'red',
      } as React.CSSProperties}
    >
      {`${t('messages.generalError')} ${errorText}`}
    </div>
  );
}
