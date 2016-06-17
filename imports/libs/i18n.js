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

  setupSimpleSchema() {
    const globalMessages = _.clone(SimpleSchema._globalMessages);
    Meteor.autorun(() => {
      const lang = TAPi18n.getLanguage();  // eslint-disable-line no-unused-vars
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
