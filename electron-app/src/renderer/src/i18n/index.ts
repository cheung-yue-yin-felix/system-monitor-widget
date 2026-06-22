import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { Language } from '../../../shared/types/settings'

const localeLoaders: Record<Language, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('./locales/en/common.json'),
  tc: () => import('./locales/tc/common.json'),
  sc: () => import('./locales/sc/common.json')
}

export async function loadLocale(lang: Language): Promise<void> {
  if (i18n.hasResourceBundle(lang, 'common')) return

  const module = await localeLoaders[lang]()
  i18n.addResourceBundle(lang, 'common', module.default)
}

export async function changeAppLanguage(lang: Language): Promise<void> {
  await loadLocale(lang)
  if (lang !== 'en') {
    await loadLocale('en')
  }
  await i18n.changeLanguage(lang)
}

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
