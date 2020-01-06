import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const locale = 'th';

const messages = {
  th: require('../lang/th-TH.json'),
  en: require('../lang/en-US.json')
};

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale,
    fallbackLocale: locale,
    silentTranslationWarn: true,
    messages
  });
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  };
};
