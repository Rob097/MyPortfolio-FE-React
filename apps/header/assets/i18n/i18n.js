import i18n from "common-lib/i18n/i18n";
import translationEN from './en.json';
import translationIT from './it.json';
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        header: translationEN
    },
    it: {
        header: translationIT
    }
};

const headerInstance = i18n.createInstance();

headerInstance
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        lng: localStorage.getItem('lang'),
        interpolation: {
            escapeValue: false,
        },
        resources: resources,
    });

export default headerInstance;