import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './en.json';
import translationIT from './it.json';

const defaultLang = "en";

const resources = {
  en: {
    common: translationEN
  },
  it: {
    common: translationIT
  }
};

export const getLang = () => {
  const currentLang = localStorage.getItem('lang');
  return resources[currentLang] ? currentLang : defaultLang;
}

export const setLang = (lang) => {
  localStorage.setItem('lang', lang);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLang,
    lng: localStorage.getItem('lang'), // language to use
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
  
export default i18n;