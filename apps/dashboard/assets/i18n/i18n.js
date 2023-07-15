import i18n from "common-new/i18n/i18n";
import translationEN from './en.json';
import translationIT from './it.json';
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        dashboard: translationEN
    },
    it: {
        dashboard: translationIT
    }
};

const dashboardInstance = i18n.createInstance();

dashboardInstance
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        lng: localStorage.getItem('lang'),
        interpolation: {
            escapeValue: false,
        },
        resources: resources,
    });

export default dashboardInstance;