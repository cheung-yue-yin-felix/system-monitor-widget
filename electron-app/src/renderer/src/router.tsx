import { lazy } from 'react'
import { createHashRouter, RouteObject } from 'react-router-dom'
import Layout from './components/Layout'
import MonitorsPage from './pages/MonitorsPage'

const MainPage = lazy(() => import('./pages/MainPage'))
const SystemPage = lazy(() => import('./pages/SystemPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'system',
        element: <SystemPage />
      }
    ]
  },
  {
    path: '/monitors',
    element: <MonitorsPage />
  }
]

export const router = createHashRouter(routes)
