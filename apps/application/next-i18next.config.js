module.exports = {
  i18n: {
    // all the locales supported in the application
    locales: ['en', 'it'],
    // the default locale to be used when visiting
    // a non-localized route (e.g. `/about`)   
    defaultLocale: 'en'
  },
  fallbackLng: {
    default: ['en'],
  },
  //needed when deploy on Vercel
  localePath: require('path').resolve('./public/locales')
}