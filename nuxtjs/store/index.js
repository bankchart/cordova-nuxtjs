export const actions = {
  nuxtClientInit({ state }, app) {
    const langs = state.session.languages;
    const langCookie = app.$utilities.getCookie('lang');
    const defaultLang = state.multiLanguage.default;
    const token = app.$utilities.getCookie('token');

    app.store.dispatch(
      'modules/userDetail/authentication/setAccessToken',
      token
    );

    if (!langCookie) {
      app.$utilities.setCookie('lang', defaultLang);
      app.store.dispatch('multiLanguage/setLanguage', defaultLang);
      app.i18n.locale = defaultLang;
    } else if (langs.includes(langCookie.toLowerCase())) {
      app.store.dispatch('multiLanguage/setLanguage', langCookie);
      app.i18n.locale = langCookie;
    } else {
      app.store.dispatch('multiLanguage/setLanguage', defaultLang);
      app.i18n.locale = defaultLang;
    }
  }
};
