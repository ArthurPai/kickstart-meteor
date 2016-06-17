import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const i18n = {
  t(key, options, langTag) {
    return TAPi18n.__(key, options, langTag);
  },

  getLanguages() {
    return TAPi18n.getLanguages();
  },

  getLanguageName(language) {
    const languages = this.getLanguages();
    if (Object.keys(languages).indexOf(language) !== -1) {
      return languages[language].name;
    } else {
      const locale = this.getDefaultLanguage();
      return languages[locale];
    }
  },

  supportedLanguages() {
    const languages = this.getLanguages();
    return Object.keys(languages).map((key) => ({ key, label: languages[key].name }));
  },

  getDefaultLanguage() {
    const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
    let locale = 'en';

    const languages = this.getLanguages();
    Object.keys(languages).forEach((language) => {
      if (localeFromBrowser === language) locale = language;
    });

    return locale;
  },

  getLanguage() {
    return TAPi18n.getLanguage();
  },

  setLanguage(language) {
    TAPi18n.setLanguage(language);
  },

  getUserLanguage(userId) {
    if (userId) {
      const user = Meteor.users.findOne({ _id: userId });
      const language = user && user.profile && user.profile.language;
      return language || this.getDefaultLanguage();
    }

    return this.getDefaultLanguage();
  },

  getCurrentUserLanguage() {
    const user = Meteor.user();
    const language = user && user.profile && user.profile.language;

    return language || this.getDefaultLanguage();
  },

  setupSimpleSchema() {
    const globalMessages = _.clone(SimpleSchema._globalMessages);
    Meteor.autorun(() => {
      const language = TAPi18n.getLanguage();  // eslint-disable-line no-unused-vars
      const localMessages = TAPi18n.__('simpleschema.messages', { returnObjectTrees: true });
      localMessages.regEx = _.map(localMessages.regEx, (_item) => {
        const item = Object.assign({}, _item);
        if (item.exp) {
          item.exp = eval(item.exp); // eslint-disable-line no-eval
        }
        return item;
      });
      const messages = _.extend(_.clone(globalMessages), localMessages);
      SimpleSchema.messages(messages);
    });
  },
};
