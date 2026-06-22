import { useEffect, useState, useCallback, useMemo, type ReactNode } from 'react'
import SettingsContext from './settings-context'
import { loadSettings, saveSettings } from '../hooks/useSettings'
import type { Language, Settings, SettingsContextValue } from '../types/settings'
import { changeAppLanguage } from '../i18n'
import Loading from '../components/Loading'

interface SettingsProviderProps {
  children: ReactNode
}

const SettingsProvider = ({ children }: SettingsProviderProps): React.JSX.Element => {
  const [settings, setSettings] = useState<Settings>(() => loadSettings())
  const [i18nReady, setI18nReady] = useState(false)

  useEffect(() => {
    window.api.settings
      .get()
      .then((loaded) => {
        setSettings((prev) => ({ ...prev, ...loaded }))
      })
      .catch((error) => {
        console.error('[SettingsProvider] Failed to load settings:', error)
      })
  }, [])

  useEffect(() => {
    return window.api.settings.onChange((next) => {
      setSettings((prev) => ({ ...prev, ...next }))
    })
  }, [])

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  useEffect(() => {
    let cancelled = false

    document.documentElement.lang = settings.language

    changeAppLanguage(settings.language)
      .then(() => {
        if (!cancelled) setI18nReady(true)
      })
      .catch((error) => {
        console.error('[SettingsProvider] Failed to load locale:', error)
      })

    return () => {
      cancelled = true
    }
  }, [settings.language])

  const updateSettings = useCallback((updater: (prev: Settings) => Settings) => {
    setSettings((prev) => {
      const next = updater(prev)
      window.api.settings.set(next)
      return next
    })
  }, [])

  const setLanguage = useCallback(
    (language: Language) => {
      updateSettings((prev) => ({ ...prev, language }))
    },
    [updateSettings]
  )

  const setDateFormat = useCallback(
    (format: string) => {
      updateSettings((prev) => ({ ...prev, dateFormat: format }))
    },
    [updateSettings]
  )

  const setTimeFormat = useCallback(
    (format: string) => {
      updateSettings((prev) => ({ ...prev, timeFormat: format }))
    },
    [updateSettings]
  )

  const setWeekDayFormat = useCallback(
    (format: string) => {
      updateSettings((prev) => ({ ...prev, weekDayFormat: format }))
    },
    [updateSettings]
  )

  const setDistrict = useCallback(
    (district: string) => {
      updateSettings((prev) => ({ ...prev, district }))
    },
    [updateSettings]
  )

  const setTempStation = useCallback(
    (station: string) => {
      updateSettings((prev) => ({ ...prev, tempStation: station }))
    },
    [updateSettings]
  )

  const value = useMemo<SettingsContextValue>(
    () => ({
      language: settings.language,
      dateFormat: settings.dateFormat,
      timeFormat: settings.timeFormat,
      weekDayFormat: settings.weekDayFormat,
      district: settings.district,
      tempStation: settings.tempStation,
      setLanguage,
      setDateFormat,
      setTimeFormat,
      setWeekDayFormat,
      setDistrict,
      setTempStation
    }),
    [
      settings,
      setLanguage,
      setDateFormat,
      setTimeFormat,
      setWeekDayFormat,
      setDistrict,
      setTempStation
    ]
  )

  if (!i18nReady) return <Loading />

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export default SettingsProvider
