export type Language = 'en' | 'tc' | 'sc'

export interface Settings {
  language: Language
  dateFormat: string
  timeFormat: string
  weekDayFormat: string
  district: string
  tempStation: string
}
