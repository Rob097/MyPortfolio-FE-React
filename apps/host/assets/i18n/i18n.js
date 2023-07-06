import i18n from "common-lib/i18n/i18n";
import authInstance from "auth/i18n";
import applicationInstance from "application/i18n";
import dashboardInstance from "dashboard/i18n";

i18n.addResourceBundle('en', 'auth', authInstance.getResourceBundle('en', 'auth'));
i18n.addResourceBundle('it', 'auth', authInstance.getResourceBundle('it', 'auth'));
i18n.addResourceBundle('en', 'application', applicationInstance.getResourceBundle('en', 'application'));
i18n.addResourceBundle('it', 'application', applicationInstance.getResourceBundle('it', 'application'));
i18n.addResourceBundle('en', 'dashboard', dashboardInstance.getResourceBundle('en', 'dashboard'));
i18n.addResourceBundle('it', 'dashboard', dashboardInstance.getResourceBundle('it', 'dashboard'));

export default i18n;