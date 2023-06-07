import i18n from "common-lib/i18n/i18n";
import authInstance from "auth/i18n";
import headerInstance from "header/i18n";

i18n.addResourceBundle('en', 'auth', authInstance.getResourceBundle('en', 'auth'));
i18n.addResourceBundle('it', 'auth', authInstance.getResourceBundle('it', 'auth'));
i18n.addResourceBundle('en', 'header', headerInstance.getResourceBundle('en', 'header'));
i18n.addResourceBundle('it', 'header', headerInstance.getResourceBundle('it', 'header'));

export default i18n;