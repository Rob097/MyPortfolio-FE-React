import i18n from "@rob097/common-lib/i18n/i18n";
import translationEN from './en.json';
import translationIT from './it.json';
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        auth: translationEN
    },
    it: {
        auth: translationIT
    }
};

const authInstance = i18n.createInstance();

authInstance
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        lng: localStorage.getItem('lang'),
        interpolation: {
            escapeValue: false,
        },
        resources: resources,
    });

export default authInstance;