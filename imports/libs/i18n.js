import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

export const i18n = {
  t(key, options, langTag) {
    return TAPi18n.__(key, options, langTag);
  },

  getLanguages() {
    return TAPi18n.getLanguages();
  },

  getLanguageName(language) {
    return this.getLanguages()[language].name;
  },

  supportedLanguages() {
    const languages = this.getLanguages();
    return Object.keys(languages).map((key) => ({ key, label: languages[key].name }));
  },

  getDefaultLanguage() {
    const languages = this.supportedLanguages();
    return languages[1].key;
  },

  getLanguage() {
    return TAPi18n.getLanguage();
  },

  setLanguage(language) {
    TAPi18n.setLanguage(language);
  },

  getUserLanguage(userId) {
    const defaultLang = this.getDefaultLanguage();

    if (userId) {
      const user = Meteor.users.findOne({ _id: userId });
      const language = user && user.profile && user.profile.language;
      return language || defaultLang;
    }

    return defaultLang;
  },

  getCurrentUserLanguage() {
    const defaultLang = this.getDefaultLanguage();

    const user = Meteor.user();
    const language = user && user.profile && user.profile.language;

    return language || defaultLang;
  },
};
