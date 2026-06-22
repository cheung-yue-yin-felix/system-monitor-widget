import { Suspense } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import Loading from './Loading'

export default function Layout(): React.JSX.Element {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const navLinkStyle = useCallback(
    (to: string): React.CSSProperties => ({
      color: 'white',
      textDecoration: pathname === to ? 'underline' : 'none',
      opacity: pathname === to ? 1 : 0.7,
      fontSize: '0.9rem',
      fontWeight: 500
    }),
    [pathname]
  )

  const isTransparent = import.meta.env.VITE_CSS_BACKGROUND_TRANSPARENT === 'TRUE'

  const wrapperStyle = useMemo(
    () =>
      ({
        minHeight: '100vh',
        background: isTransparent ? 'none' : 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: '"Tektur", sans-serif',
        gap: '24px'
      }) as React.CSSProperties,
    [isTransparent]
  )

  const navStyle = useMemo(
    () =>
      ({
        display: 'flex',
        gap: '24px',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '10px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(8px)'
      }) as React.CSSProperties,
    []
  )

  return (
    <div style={wrapperStyle}>
      <nav style={navStyle}>
        <Link to="/" style={navLinkStyle('/')}>
          {t('titles.main')}
        </Link>
        <Link to="/system" style={navLinkStyle('/system')}>
          {t('titles.system')}
        </Link>
        <Link to="/settings" style={navLinkStyle('/settings')}>
          {t('titles.settings')}
        </Link>
      </nav>

      <main
        style={{
          width: '100%',
          maxWidth: '960px'
        }}
      >
        <Suspense fallback={<Loading/>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
