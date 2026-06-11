import { createHashRouter, RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import SettingsPage from './pages/SettingsPage'
import MainPage from './pages/MainPage';
import SystemPage from './pages/SystemPage';

const routes: RouteObject[] = [
  {
    path: "/",
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
  }
];

export const router = createHashRouter(routes)
