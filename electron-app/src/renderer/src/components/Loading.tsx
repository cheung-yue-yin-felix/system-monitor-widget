import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();
  const dpr = window.devicePixelRatio;

  return (
    <div
      className="card"
      style={{
        '--dpr': dpr,
        textAlign: 'center',
        verticalAlign: 'middle',
      } as React.CSSProperties}
    >
      {t('messages.waitingForData')}
    </div>
  );
}
