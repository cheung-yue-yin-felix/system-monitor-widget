import { createContext } from 'react'
import type { SettingsContextValue } from '../types/settings'

const SettingsContext = createContext<SettingsContextValue | null>(null)

export default SettingsContext
