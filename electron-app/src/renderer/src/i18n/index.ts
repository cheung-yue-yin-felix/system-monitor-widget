import i18n from 'i18next'
import { initReactI18next } from "react-i18next"
import enCommon from './locales/en/common.json'
import tcCommon from './locales/tc/common.json'
import scCommon from './locales/sc/common.json'

const resources = {
  en: { common: enCommon },
  tc: { common: tcCommon },
  sc: { common: scCommon },
} as const

i18n
.use(initReactI18next)
.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
