import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'

async function setupI18n(
  options = { locale: import.meta.env.VITE_APP_I18N_LOCALE },
) {
  const i18n = createI18n(options)
  await loadLocaleMessages(i18n, options.locale)
  setI18nLanguage(i18n, options.locale)
  return i18n
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  )

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

export const i18n = await setupI18n()
