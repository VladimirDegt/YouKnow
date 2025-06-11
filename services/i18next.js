import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ua from '../locales/ua.json';
import sp from '../locales/sp.json';

const languagesResources = {
    en: {translation: en},
    ru: {translation: ru},
    ua: {translation: ua},
    sp: {translation: sp}
  };

i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: languagesResources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
